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
    // Save the product document
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
    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(public_Id);

    // Find product document with matching publicId
    const product = await Product.findOne({ 'image.publicId': public_Id });

    // Update product document with null URL and publicId
    if (product) {
      product.image.url = 'null';
      product.image.publicId = 'null';
      await product.save();
      res.json({
        message: "Image deleted successfully and product document updated",
        product,
      });
    }
    if(!product){
      res.json({
        message : 'not found image'
      })
    }
  } catch (err) {
    res.json({
      err,
    });
  }
});


module.exports = router;
