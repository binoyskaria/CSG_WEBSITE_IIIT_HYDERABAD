// adminControllers.js

const Image = require('../models/Image'); // Import the Image model
const Publication = require('../models/Publication'); // Import the Publication model
const multer = require('multer');

// Function to handle image upload
const handleImageUpload = async (req, res) => {
  // Multer configuration for file upload
  const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
  }).single('image');

  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading image:', err);
      return res.status(500).json({ error: 'Error uploading image' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { imageName, description } = req.body;

    const newImage = new Image({
      imageUrl: req.file.filename,
      imageName: imageName,
      description: description,
    });

    try {
      const savedImage = await newImage.save();
      res.json({
        message: 'Image uploaded successfully',
        imageUrl: savedImage.imageUrl,
        imageName: savedImage.imageName,
        description: savedImage.description,
      });
    } catch (error) {
      console.error('Error saving image to the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

// Function to handle adding a new publication
const handleAddPublication = async (req, res) => {
  try {
    const { title, date, description } = req.body;

    if (!title || !date || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPublication = new Publication({
      title,
      date,
      description,
    });

    const savedPublication = await newPublication.save();

    res.json({ message: 'Publication added successfully', publication: savedPublication });
  } catch (error) {
    console.error('Error adding publication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { handleImageUpload, handleAddPublication };
