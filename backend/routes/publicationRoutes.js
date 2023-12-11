const express = require('express');
const Publication = require('../models/Publication');

const FocusSevenPublication = require('../models/FocusSevenPublication'); // Make sure the path is correct
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







// Route to get all FocusSevenPublications
router.get('/getFocusSevenPublications', async (req, res) => {
  try {
    console.log('Fetching FocusSevenPublications...');

    const focusSevenPublications = await FocusSevenPublication.find();

    console.log('FocusSevenPublications fetched:', focusSevenPublications);

    // You can format the response as needed
    const formattedFocusSevenPublications = focusSevenPublications.map((publication) => ({
      title: publication.title,
      author: publication.author,
      link: publication.link,
      index: publication.index,
    }));

    console.log('Formatted FocusSevenPublications:', formattedFocusSevenPublications);

    res.json({ publications: formattedFocusSevenPublications });
  } catch (error) {
    console.error('Error fetching FocusSevenPublications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






module.exports = router;
