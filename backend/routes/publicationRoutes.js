const express = require('express');
const Publication = require('../models/Publication');

const router = express.Router();

// Route to get all publications
router.get('/getPublications', async (req, res) => {
  try {
    console.log('Fetching publications...');

    const publications = await Publication.find();

    console.log('Publications fetched:', publications);

    const publicationEvents = publications.map((publication) => ({
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

// Route to add a new publication
router.post('/addPublication', async (req, res) => {
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
});

module.exports = router;
