const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary"); // adjust path as needed

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "userArtists",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "trackAudios",
    resource_type: "auto",
    allowed_formats: ["mp3", "wav", "m4a"],
  },
});

module.exports = { imageStorage, audioStorage };
