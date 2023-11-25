const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

router.post("/upload", upload.single("image"), function (req, res) {
  try {
    cloudinary.uploader.upload(req.file.path, function (result) {
      res.json({
        data: result,
        success: true,
        message: "Uploaded!",
      });
    });
  } catch (error) {
    res.json({
      err: "error in upload image",
    });
  }
});

module.exports = router;
