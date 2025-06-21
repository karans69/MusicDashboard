const express = require("express");
const router = express.Router();
const database = require("../connect");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); 

const SECRET_KEY = process.env.SECRET_KEY || "Dprosen2025";

// 🔐 Token authentication middleware
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id;
    next();
  });
}

// 📦 Get all tracks uploaded by the logged-in user
router.get("/api/tracks/my", authenticateToken, async (req, res) => {
  const db = database.getDb();
  const tracks = await db
    .collection("tracks")
    .find({ userId: new ObjectId(req.userId) })  // ✅ FIXED: added `new`
    .sort({ createdAt: -1 })
    .toArray();
  res.json(tracks);
});

// 🎨 Add a new artist
router.post(
  "/api/userArtists",
  authenticateToken,
  upload.single("image"), // "image" is the field name in FormData
  async (req, res) => {
    try {
      const db = database.getDb();

      const name = req.body.name;
      const imagePath = req.file?.path; // multer gives you req.file

      const artist = {
        userId: new ObjectId(req.userId),
        name,
        imagePath,
        createdAt: new Date(),
      };

      const result = await db.collection("userArtists").insertOne(artist);
      res.json({ _id: result.insertedId, ...artist });
    } catch (err) {
      console.error("Error adding artist:", err);
      res.status(500).json({ error: "Failed to add artist" });
    }
  }
);

// 🎨 Get all user-specific artists
router.get("/api/userArtists", authenticateToken, async (req, res) => {
  const db = database.getDb();
  const artists = await db
    .collection("userArtists")
    .find({ userId: new ObjectId(req.userId) })  // ✅ FIXED: added `new`
    .toArray();
  res.json(artists);
});

module.exports = router;
