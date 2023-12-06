// Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  faculty: String,
  companyfund: String,
  date: String,
  summary: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
