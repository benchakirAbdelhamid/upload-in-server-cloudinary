const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
// upload image and create data
router.post("/upload-image", upload.single("image"), async (req, res) => {
  const { path } = req.file;
  // const InfoImage = req.file

  // res.json({InfoImage})

  try {
    if(req.file.size < 600000){
      const result = await cloudinary.uploader.upload(path,{
        folder:'imgExpress'
      });

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
      res.json({  message: "Product created successfully", result, product });
    }else if(req.file.size > 600000){
      res.json({
        message : 'size > 1MB'
      })
    }
    
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
    const cloudimg = await cloudinary.uploader.destroy(`imgExpress/${public_Id}`);

    // Find product document with matching publicId
    const product = await Product.findOne({ 'image.publicId': `imgExpress/${public_Id}` });

    // Update product document with null URL and publicId
    if (product) {
      product.image.url = 'null';
      product.image.publicId = 'null';
      await product.save();
      res.json({
        message: "Image deleted successfully and product document updated",
        product,
        cloudimg
      });
    }
    if(!product){
      res.json({
        message : 'not found image',
        cloudimg
      })
    }
  } catch (err) {
    res.json({
      err,
    });
  }
});


module.exports = router;
