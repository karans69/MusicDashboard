const cloudinaryModule = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinaryModule.config({
  cloud_name: "dvhb1be1m",
  api_key: "778273998351137",
  api_secret: "Oac1emJzbIENC0ZJaU8Qvcssg6w",
});


module.exports = {
  cloudinary: cloudinaryModule,
  CloudinaryStorage,
};
