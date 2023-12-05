// adminRoutes.js

const express = require('express');
const { isAdmin } = require('../middleware/authMiddleware'); // Assuming you have an auth middleware
const router = express.Router();

// Import your controllers/handlers for image upload and publication add
const { handleImageUpload, handleAddPublication } = require('../controllers/adminControllers');

// Image upload route
router.post('/upload', isAdmin, handleImageUpload);

// Publication add route
router.post('/addPublication', isAdmin, handleAddPublication);

module.exports = router;
