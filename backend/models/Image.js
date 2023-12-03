const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: String, // This should store the original filename or a modified version
});


module.exports = mongoose.model('Image', imageSchema);
