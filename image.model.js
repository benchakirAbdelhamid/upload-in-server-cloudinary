const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
},{timestamps : true});


module.exports = mongoose.model('ImageModel' , ImageSchema)