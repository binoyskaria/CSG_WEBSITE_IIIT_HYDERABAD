const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Image = require('../models/Image');

const router = express.Router();


// Route to handle downloading all images
router.get('/download/all', async (req, res) => {
  try {
    console.log('Fetching all images from the database...');

    const images = await Image.find();

    if (!images || images.length === 0) {
      console.log('No images found in the database.');
      return res.status(404).json({ error: 'No images found' });
    }

    const imageResponses = await Promise.all(
      images.map(async (image) => {
        const imagePath = path.join(__dirname, '../uploads', image.imageUrl);

        console.log(`Reading image data for ${image.imageUrl}...`);

        // Read image data as base64
        const imageData = await fs.promises.readFile(imagePath, { encoding: 'base64' });

        console.log(`Image data read successfully for ${image.imageUrl}.`);

        return {
          imageUrl: image.imageUrl,
          imageName: image.imageName,
          description: image.description,
          imageData: imageData,
        };
      })
    );

    console.log('Sending image responses to the client...');
    res.json(imageResponses);

  } catch (error) {
    console.error('Error retrieving images and data from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
