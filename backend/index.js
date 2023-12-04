const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const Image = require('./models/Image');
const path = require('path');
const fs = require('fs');
const Publication = require('./models/Publication');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://csgiiit2:iiitcsg@cluster0.rqszplh.mongodb.net/', {
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



//upload
///////////////////////////////////////////////////////////////////////////////////////////////
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







//download
///////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/download/all', async (req, res) => {
  try {
    console.log('Fetching all images from the database...');
    
    const images = await Image.find();

    if (!images || images.length === 0) {
      console.log('No images found in the database.');
      return res.status(404).json({ error: 'No images found' });
    }

    const imageResponses = await Promise.all(
      images.map(async (image) => {
        const imagePath = path.join(__dirname, 'uploads', image.imageUrl);
        
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



//initialize server
///////////////////////////////////////////////////////////////////////////////////////////////
async function initializeServer() {
  try {
    // Clear the "Image" collection
    const imageCount = await Image.countDocuments({ /* your criteria */ });
    console.log(`Step 1: Counted ${imageCount} images in the collection.`);

    if (imageCount > 0) {
      await Image.deleteMany({ /* your criteria */ });
      console.log(`${imageCount} images deleted.`);
    } else {
      console.log('No images to delete.');
    }

    // Read image data from CSV file
    const imageData = [];
    fs.createReadStream('./uploads/imageData.csv')
      .pipe(csv())
      .on('data', (row) => {
        imageData.push(row);
      })
      .on('end', async () => {
        console.log('Step 2: Read image data from CSV file.');

        // Read files in the "uploads" folder and save them to the database
        const files = fs.readdirSync('./uploads/');
        for (const file of files) {
          const imageRecord = imageData.find((data) => data.imagename === file);

          if (imageRecord) {
            const { name, imagedescription } = imageRecord;
            const newImage = new Image({
              imageUrl: file,
              name: name || '',
              imageDescription: imagedescription || '',
            });
            await newImage.save();
            console.log(`Step 3: Saved ${file} (${name}, ${imagedescription}) to the database.`);
          } else {
            console.log(`Warning: No data found for ${file} in the CSV file.`);
          }
        }

        console.log('Database and file uploads initialized successfully');
      });

  } catch (error) {
    console.error('Error initializing server:', error);
    process.exit(1); // Exit the process if an error occurs during initialization
  }
}



//publications
///////////////////////////////////////////////////////////////////////////////////////////////
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

initializeServer();




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
