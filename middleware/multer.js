const multer = require("multer");

const storage = multer.diskStorage({
  // destination: "uploads/", // // stock in local
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 } // Set the maximum file size in bytes (1MB in this example)
// });

module.exports = upload;
