// initServer.js
const fs = require('fs');
const csv = require('csv-parser');
const Image = require('./models/Image');
const FacultyImage = require('./models/FacultyImage');
const Publication = require('./models/Publication');
const Project = require('./models/Project'); // Add this line

async function initializeProjectServer() {
  try {
    const projectCount = await Project.countDocuments({});
    console.log(`Step 1: Counted ${projectCount} projects in the collection.`);

    if (projectCount > 0) {
      await Project.deleteMany({});
      console.log(`${projectCount} projects deleted.`);
    } else {
      console.log('No projects to delete.');
    }

    const projectData = [];
    fs.createReadStream('./data/projectData.csv')
      .pipe(csv({ separator: '#' }))
      .on('data', (row) => {
        const [title, faculty, companyfund, date, summary] = Object.values(row);
        projectData.push({ title, faculty, companyfund, date, summary });
      })
      .on('end', async () => {
        console.log('Step 2: Read project data from CSV file.');

        for (const project of projectData) {
          const newProject = new Project(project);
          await newProject.save();
          console.log(`Step 3: Saved ${project.title} to the database.`);
        }

        console.log('Database and project data initialized successfully');
      });

  } catch (error) {
    console.error('Error initializing project server:', error);
    process.exit(1);
  }
}






async function initializePublicationServer() {
  try {
    const publicationCount = await Publication.countDocuments({});
    console.log(`Step 1: Counted ${publicationCount} publications in the collection.`);

    if (publicationCount > 0) {
      await Publication.deleteMany({});
      console.log(`${publicationCount} publications deleted.`);
    } else {
      console.log('No publications to delete.');
    }

    const publicationData = [];
    fs.createReadStream('./data/publication.csv')
      .pipe(csv({ separator: '#' }))
      .on('data', (row) => {
        const [title, date, description] = Object.values(row);
        publicationData.push({ title, date, description });
      })
      .on('end', async () => {
        console.log('Step 2: Read publication data from CSV file.');

        for (const publication of publicationData) {
          const newPublication = new Publication(publication);
          await newPublication.save();
          console.log(`Step 3: Saved ${publication.title} to the database.`);
        }

        console.log('Database and publication data initialized successfully');
      });

  } catch (error) {
    console.error('Error initializing publication server:', error);
    process.exit(1);
  }
}

async function initializeImageServer() {
  try {
    const imageCount = await Image.countDocuments({});
    console.log(`Step 1: Counted ${imageCount} images in the collection.`);

    if (imageCount > 0) {
      await Image.deleteMany({});
      console.log(`${imageCount} images deleted.`);
    } else {
      console.log('No images to delete.');
    }

    const imageData = [];
    fs.createReadStream('./data/imageData.csv')
      .pipe(csv({ separator: '#' }))
      .on('data', (row) => {
        imageData.push(row);
      })
      .on('end', async () => {
        console.log('Step 2: Read image data from CSV file.');

        const files = fs.readdirSync('./uploads/students/');
        for (const file of files) {
          const imageRecord = imageData.find((data) => data.imagename === file);

          if (imageRecord) {
            const { name, imagedescription } = imageRecord;
            const newImage = new Image({
              imageUrl: file,
              title: name || '',
              description: imagedescription || '',
            });
            await newImage.save();
            console.log(`Step 3: Saved ${file} (${name}, ${imagedescription}) to the database.`);
          } else {
            console.log(`Warning: No data found for ${file} in the CSV file.`);
          }
        }

        console.log('Database and file uploads initialized successfully');
      });

  } catch (error) {
    console.error('Error initializing image server:', error);
    process.exit(1);
  }
}

async function initializeFacultyServer() {
  try {
    const imageCount = await FacultyImage.countDocuments({});
    console.log(`Step 1: Counted ${imageCount} images in the collection.`);

    if (imageCount > 0) {
      await FacultyImage.deleteMany({});
      console.log(`${imageCount} images deleted.`);
    } else {
      console.log('No images to delete.');
    }

    const imageData = [];
    fs.createReadStream('./data/facultyData.csv')
      .pipe(csv({ separator: '#' }))
      .on('data', (row) => {
        imageData.push(row);
      })
      .on('end', async () => {
        console.log('Step 2: Read image data from CSV file.');

        const files = fs.readdirSync('./uploads/faculty');
        for (const file of files) {
          const imageRecord = imageData.find((data) => data.imagename === file);

          if (imageRecord) {
            const { name, imagedescription } = imageRecord;
            const newImage = new FacultyImage({
              imageUrl: file,
              title: name || '',
              description: imagedescription || '',
            });
            await newImage.save();
            console.log(`Step 3: Saved ${file} (${name}, ${imagedescription}) to the database.`);
          } else {
            console.log(`Warning: No data found for ${file} in the CSV file.`);
          }
        }

        console.log('Database and file uploads initialized successfully');
      });

  } catch (error) {
    console.error('Error initializing image server:', error);
    process.exit(1);
  }
}


// ... (Your existing code for initializeImageServer and initializePublicationServer)

module.exports = { initializeImageServer, initializePublicationServer, initializeProjectServer, initializeFacultyServer };