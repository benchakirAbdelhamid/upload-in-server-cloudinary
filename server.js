// // =============================== storage multer ===============================
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const multer = require("multer");

// //Config App
// const app = express();
// require("dotenv").config();

// //Middlewares ==>json body
// // app.use(express.json());
// app.use(bodyParser.json());

// // ===============================
// const ImageModel = require("./image.model");
// // ===============================

// async function startServer() {
//   try {
//     await mongoose.connect(process.env.DATABASE, { dbName: "DBimages" });
//     console.log("Successfully connected to MongoDB");
//   } catch (err) {
//     console.error("Failed to connect to MongoDB:", err);
//     return;
//   }

//   const port = process.env.PORT || 3000;
//   app.listen(port, () => console.log(`App is running on port ${port}`));
// }

// startServer();

// // ===storage
// const Storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: Storage,
// }).single("testImage");

// app.get("/", (req, res) => {
//   res.json({
//     message: "hello",
//   });
// });

// app.post("/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const newImage = new ImageModel({
//         name: req.body.name,
//         image: {
//           data: req.file.filename,
//           contentType: "image/png",
//         },
//       });
//       newImage
//         .save()
//         .then(() => res.json({message : "successfuly uploaded" , newImage}))
//         .catch((err) => console.log(err));
//     }
//   });
// });

// // // =============================== cloudinaty ===============================
// // // cloudinaty account : https://cloudinary.com/signup
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const uploadRoute = require('./controllers/routeUpload');
// //Config App
// const app = express();
// require("dotenv").config();

// //Middlewares ==>json body
// app.use(bodyParser.json());

// async function startServer() {
//   try {
//     await mongoose.connect(process.env.DATABASE, { dbName: "DBimages" });
//     console.log("Successfully connected to MongoDB");
//   } catch (err) {
//     console.error("Failed to connect to MongoDB:", err);
//     return;
//   }

//   const port = process.env.PORT || 3000;
//   app.listen(port, () => console.log(`App is running on port ${port}`));
// }

// startServer();

// // ===storage

// app.get("/", (req, res) => {
//   res.json({
//     message: "hello hamid",
//   });
// });

// app.use("/api/users" , uploadRoute);

// =====================

// // =============================== cloudinaty model router controller ===============================
// // cloudinaty account : https://cloudinary.com/signup
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const uploadImage = require("./controllers/uploadImage");
//Config App
const app = express();
require("dotenv").config();

//Middlewares ==>json body
app.use(bodyParser.json());

async function startServer() {
  try {
    await mongoose.connect(process.env.DATABASE, { dbName: "DBimages" });
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    return;
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`App is running on port ${port}`));
}

startServer();

// ===storage
app.use("/", uploadImage);
