const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  date: {
    type: String,
   
  },
  description: {
    type: String,
   
  },
});

module.exports = mongoose.model('Publication', publicationSchema);
