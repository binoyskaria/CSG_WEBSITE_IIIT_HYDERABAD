const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: String,
  imageDescription: String,
});


module.exports = mongoose.model('Image', imageSchema);
