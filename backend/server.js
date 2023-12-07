const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const adminRoutes = require('./routes/adminRoutes');
const { initializeImageServer, initializePublicationServer, initializeProjectServer, initializeFacultyServer, initializeFocusSevenPublicationServer } = require('./initServer');

require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/api/admin', adminRoutes);

initializeImageServer();
initializePublicationServer();
initializeProjectServer();
initializeFacultyServer();
initializeFocusSevenPublicationServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
