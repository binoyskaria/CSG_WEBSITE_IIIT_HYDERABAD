const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: String,
  imageName:String,
  description: String,
});


module.exports = mongoose.model('Image', imageSchema);
