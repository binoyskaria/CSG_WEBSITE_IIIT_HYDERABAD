const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const { initializeImageServer, initializePublicationServer } = require('./initServer');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://csgiiit2:iiitcsg@cluster0.rqszplh.mongodb.net/', {
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

initializeImageServer();
initializePublicationServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
