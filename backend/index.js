const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const Image = require('./models/Image');
const path = require('path');
const fs = require('fs');
const Publication = require('./models/Publication');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://csgproject:1q2w3e4r@csg.qcbtwhu.mongodb.net/csgdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Event listener for connection error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Event listener for connection termination
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    // Use the original filename to prevent naming conflicts
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}).single('image');

app.post('/api/upload', (req, res) => {
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
});



// ... (existing code)

app.get('/api/images', async (req, res) => {
  try {
    console.log('Fetching images...');

    const images = await Image.find();
    console.log('Fetched images from the database:', images);

    const imageUrls = images.map(image => image.imageUrl);
    console.log('Extracted image URLs:', imageUrls);

    res.json(imageUrls);
    console.log('Sent image URLs as JSON response.');
  } catch (error) {
    console.error('Error fetching image URLs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.get('/api/download/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const image = await Image.findOne({ imageUrl: filename });

    if (!image) {
      console.log('Image not found in the database');
      return res.status(404).json({ error: 'Image not found' });
    }

    console.log('Found image in the database:', image);

    const imagePath = path.join(__dirname, 'uploads', image.imageUrl);

    console.log('Constructed image path:', imagePath);

    res.sendFile(imagePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('File sent successfully');
      }
    });
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




async function initializeServer() {
  try {
    // Clear the "Image" collection
    const imageCount = await Image.countDocuments({ /* your criteria */ });

if (imageCount > 0) {
  await Image.deleteMany({ /* your criteria */ });
  console.log(`${imageCount} images deleted.`);
} else {
  console.log('No images to delete.');
}

    // await Image.deleteMany({});

    // Read files in the "uploads" folder and save them to the database
    const files = fs.readdirSync('./uploads/');
    for (const file of files) {
      const newImage = new Image({
        imageUrl: file,
      });
      await newImage.save();
    }

    console.log('Database and file uploads initialized successfully');
  } catch (error) {
    console.error('Error initializing server:', error);
    process.exit(1); // Exit the process if an error occurs during initialization
  }
}


app.get('/api/getPublications', async (req, res) => {
  try {
    console.log('Fetching publications...');
    
    // Assuming you have a Publication model with appropriate fields
    const publications = await Publication.find();
    
    console.log('Publications fetched:', publications);

    const publicationEvents = publications.map(publication => ({
      title: publication.title,
      date: publication.date,
      body: publication.description,
    }));

    console.log('Formatted publication events:', publicationEvents);

    res.json({ events: publicationEvents });
  } catch (error) {
    console.error('Error fetching publications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.post('/api/addPublication', async (req, res) => {
  try {
    const { title, date, description } = req.body; // Assuming the request body contains these fields

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
});

// ... (existing code)




// Call the initialization function
initializeServer();


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

initializeServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
