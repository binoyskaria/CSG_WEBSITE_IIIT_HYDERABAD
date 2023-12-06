const express = require('express');
const imageRoutes = require('./imageRoutes');
const publicationRoutes = require('./publicationRoutes');
const projectRoutes = require('./projectRoutes');
const router = express.Router();

router.use('/images', imageRoutes);
router.use('/publications', publicationRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
