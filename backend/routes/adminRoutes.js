// adminRoutes.js

const express = require('express');
const { isAdmin } = require('../middleware/authMiddleware'); // Assuming you have an auth middleware
const router = express.Router();

// Import your controllers/handlers for image upload and publication add
const { handleImageUpload,handleFacultyUpload, handleAddPublication,handleAddProject,handleAddFocusSevenPublication,handleLogin } = require('../controllers/adminControllers');

// Image upload route
router.post('/login', handleLogin);
router.post('/upload', isAdmin, handleImageUpload);

router.post('/facultyUpload', isAdmin, handleFacultyUpload);

// Publication add route
router.post('/addPublication', isAdmin, handleAddPublication);

router.post('/addFocusSevenPublication', isAdmin, handleAddFocusSevenPublication);



router.post('/addProject', isAdmin, handleAddProject);


module.exports = router;
