const express = require('express');
const Project = require('../models/Project'); // Assuming your project model is in the specified path

const router = express.Router();

// Route to get all projects
router.get('/getProjects', async (req, res) => {
  try {
    console.log('Fetching projects...');

    const projects = await Project.find();

    console.log('Projects fetched:', projects);

    const projectList = projects.map((project) => ({
      title: project.title,
      faculty: project.faculty,
      companyfund: project.companyfund,
      date: project.date,
      summary: project.summary,
    }));

    console.log('Formatted project list:', projectList);

    res.json({ projects: projectList });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
