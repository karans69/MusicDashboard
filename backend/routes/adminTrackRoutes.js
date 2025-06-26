const express = require("express");
const { ObjectId } = require("mongodb");
const database = require("../connect");
const jwt = require("jsonwebtoken");
const archiver = require("archiver");
const axios = require("axios");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "Dprosen2025";

// 🔐 Admin Auth Middleware
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err || !payload.isAdmin) return res.status(403).json({ error: "Forbidden" });
    req.adminId = payload.id;
    next();
  });
}

//
// ✅ NEW: GET /api/admin/tracks → fetch all uploaded tracks
//
router.get("/api/admin/tracks", verifyAdmin, async (req, res) => {
  try {
    const db = database.getDb();
    const tracks = await db
      .collection("tracks")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json(tracks);
  } catch (err) {
    console.error("Error fetching tracks:", err);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

//
// 🎧 GET /api/admin/tracks/:id/zip → download artwork + audio + metadata as ZIP
//
router.get("/api/admin/tracks/:id/zip", verifyAdmin, async (req, res) => {
  const db = database.getDb();
  const track = await db.collection("tracks").findOne({ _id: new ObjectId(req.params.id) });
  if (!track) return res.status(404).json({ error: "Track not found" });

  res.set({
    "Content-Type": "application/zip",
    "Content-Disposition": `attachment; filename=${track.title.replace(/\s+/g, "_")}.zip`,
  });

  const archive = archiver("zip");
  archive.pipe(res);

  try {
    const artBuf = (await axios.get(track.artworkPath, { responseType: "arraybuffer" })).data;
    const audioBuf = (await axios.get(track.audioPath, { responseType: "arraybuffer" })).data;

    archive.append(artBuf, { name: "artwork.jpg" });
    archive.append(audioBuf, { name: "audio.mp3" });
    archive.append(JSON.stringify(track, null, 2), { name: "metadata.json" });

    await archive.finalize();
  } catch (error) {
    console.error("ZIP generation error:", error);
    res.status(500).json({ error: "Failed to generate ZIP" });
  }
});

//
// 📝 PATCH /api/admin/tracks/:id → update status
//
router.patch("/api/admin/tracks/:id", verifyAdmin, async (req, res) => {
  const { status } = req.body; // "Pending" | "Approved" | "Rejected"
  const db = database.getDb();
  await db.collection("tracks").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { status } }
  );
  res.json({ message: "Status updated" });
});

module.exports = router;
