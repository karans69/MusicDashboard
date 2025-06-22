// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dvhb1be1m",
  api_key: process.env.CLOUDINARY_API_KEY || "778273998351137",
  api_secret: process.env.CLOUDINARY_API_SECRET || "Oac1emJzbIENC0ZJaU8Qvcssg6w",
});

module.exports = cloudinary; // ✅ Just export v2 directly
