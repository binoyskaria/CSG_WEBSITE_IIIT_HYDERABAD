const mongoose = require('mongoose');

const focusSevenPublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  author: {
    type: String,
   
  },
  link: {
    type: String,
   
  },
});

module.exports = mongoose.model('FocusSevenPublication', focusSevenPublicationSchema);
