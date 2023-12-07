const express = require('express');
const imageRoutes = require('./imageRoutes');
const facultyRoutes = require('./facultyRoutes');
const publicationRoutes = require('./publicationRoutes');
const projectRoutes = require('./projectRoutes');
const router = express.Router();

router.use('/images', imageRoutes);
router.use('/publications', publicationRoutes);
router.use('/projects', projectRoutes);
router.use('/faculty', facultyRoutes);

module.exports = router;
