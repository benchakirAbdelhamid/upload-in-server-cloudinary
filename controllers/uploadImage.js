const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
// upload image and create data
router.post("/upload-image", upload.single("image"), async (req, res) => {
  const { path } = req.file;

  // res.json({path})

  try {
    const result = await cloudinary.uploader.upload(path);

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });

    await product.save();
    res.json({ message: "Product created successfully", result, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// delete image
router.delete("/delete/:id", async (req, res) => {
  try {
    let public_Id = req.params.id;
    await cloudinary.uploader.destroy(public_Id, async () => {
      let product = await Product.findOne({ "image.publicId": public_Id });
      product.image.url = "null";
      product.image.publicId = "null";
      product.save();
      res.json({
        message: "Image deleted successfully and product document updated",
        product,
      });
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});


module.exports = router;
