const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
const { initializeImageServer, initializePublicationServer, initializeProjectServer, initializeFacultyServer, initializeFocusSevenPublicationServer } = require('./initServer');

require('dotenv').config(); // Load environment variables from .env file

const app = express();
// Middleware to log every request

const PORT = process.env.PORT || 3000;
console.log("connecting to" +process.env.MONGODB_URI );
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});


// Allow all origins
app.use(cors());
app.use(express.json());


initializeImageServer();
initializePublicationServer();
initializeProjectServer();
initializeFacultyServer();
initializeFocusSevenPublicationServer();

// Define a route that returns the specified string in a text file
app.get('/loaderio-3032b85b45eec7de7212b51aff606f58.txt', (req, res) => {
  const content = 'loaderio-3032b85b45eec7de7212b51aff606f58';

  // Set the response headers
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', 'inline');

  // Send the content as a response
  res.send(content);

  // Alternatively, you can save the content to a file
  // fs.writeFileSync('loaderio.txt', content, 'utf-8');
});


app.use('/api', routes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
