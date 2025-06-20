const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const database = require("../connect");

const SECRET_KEY = "Dprosen2025"; // use env in production
const router = express.Router();

// 📂 Setup multer to store files locally (or configure cloud later)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// 🔐 Middleware to extract user from token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id; // 👈 extracted user ID from token
    next();
  });
}

// 📥 Upload Route
router.post(
  "/upload", // ✅ this matches /api/tracks/upload
  authenticateToken,
  upload.fields([
    { name: "artwork", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const db = database.getDb();

      const track = {
        userId: new ObjectId(req.userId),
        title: req.body.title,
        genre: req.body.genre,
        lline: req.body.lline,
        cline: req.body.cline,
        upc: req.body.upc || null,
        artist: req.body.artist,
        producers: req.body.producers,
        engineers: req.body.engineers,
        musicians: req.body.musicians,
        otherContributors: req.body.otherContributors,
        recordingDetails: req.body.recordingDetails,
        releaseDate: req.body.releaseDate,
        artworkPath: req.files.artwork?.[0]?.path || null,
        audioPath: req.files.audio?.[0]?.path || null,
        createdAt: new Date(),
      };

      const result = await db.collection("tracks").insertOne(track);
      res.json({ message: "Track uploaded successfully", trackId: result.insertedId });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ message: "Failed to upload track" });
    }
  }
);

module.exports = router;
