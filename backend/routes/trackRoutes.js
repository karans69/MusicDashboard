const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const database = require("../connect");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

const SECRET_KEY = "Dprosen2025";
const router = express.Router();

// 🧠 Memory storage for multer
const upload = multer({ storage: multer.memoryStorage() });

// 🔐 Auth middleware
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id;
    next();
  });
}

// 📥 Upload route
router.post(
  "/upload",
  authenticateToken,
  upload.fields([
    { name: "artwork", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const db = database.getDb();
      const artworkFile = req.files.artwork?.[0];
      const audioFile = req.files.audio?.[0];

      // Helper: upload buffer to Cloudinary
      const uploadToCloudinary = (fileBuffer, folder, resource_type) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
      };

      const artworkResult = await uploadToCloudinary(
        artworkFile.buffer,
        "track-artworks",
        "image"
      );

      const audioResult = await uploadToCloudinary(
        audioFile.buffer,
        "track-audios",
        "video"
      );

      const track = {
        userId: new ObjectId(req.userId),
        title: req.body.title,
        genre: req.body.genre,
        lline: req.body.lline,
        cline: req.body.cline,
        upc: req.body.upc || null,
        format: req.body.format,
        albumName: req.body.albumName,
        language: req.body.language,
        artist: req.body.artist,
        labels: req.body.labels,
        featuring: req.body.featuring,
        isrc: req.body.isrc,
        producers: req.body.producers,
        engineers: req.body.engineers,
        musicians: req.body.musicians,
        otherContributors: req.body.otherContributors,
        recordingDetails: req.body.recordingDetails,
        releaseDate: req.body.releaseDate,
        revenu: req.body.revenu || "0",
        authors: JSON.parse(req.body.authors || "[]"),
        composers: JSON.parse(req.body.composers || "[]"),
        artworkPath: artworkResult.secure_url,
        audioPath: audioResult.secure_url,
        createdAt: new Date(),
      };

      const saved = await db.collection("tracks").insertOne(track);
      res.json({ message: "Track uploaded", trackId: saved.insertedId });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

module.exports = router;
