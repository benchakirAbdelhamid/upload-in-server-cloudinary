const multer = require("multer");

const storage = multer.diskStorage({
  // destination: "uploads/", // // stock in local
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
