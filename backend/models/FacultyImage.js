const mongoose = require('mongoose');

const facultyImageSchema = new mongoose.Schema({
  imageUrl: String,
  title:String,
  description: String,
});


module.exports = mongoose.model('FacultyImage', facultyImageSchema);
