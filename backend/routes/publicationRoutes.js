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



module.exports = router;
