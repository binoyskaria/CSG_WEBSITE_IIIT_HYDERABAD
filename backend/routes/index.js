const express = require('express');
const imageRoutes = require('./imageRoutes');
const publicationRoutes = require('./publicationRoutes');

const router = express.Router();

router.use('/images', imageRoutes);
router.use('/publications', publicationRoutes);

module.exports = router;
