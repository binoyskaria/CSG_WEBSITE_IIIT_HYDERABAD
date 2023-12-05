const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: String,
  title:String,
  description: String,
});


module.exports = mongoose.model('Image', imageSchema);
