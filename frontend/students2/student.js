// Function to create student elements
function createStudent(name, degree, imgSrc) {
  const studentContainer = document.getElementById("students-container");

  const studentDiv = document.createElement("div");
  studentDiv.className = "student";

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = name;

  const namePara = document.createElement("p");
  namePara.className = "student-name";
  namePara.textContent = name;

  const degreePara = document.createElement("p");
  degreePara.className = "student-degree";
  degreePara.textContent = degree;

  studentDiv.appendChild(img);
  studentDiv.appendChild(namePara);
  studentDiv.appendChild(degreePara);

  studentContainer.appendChild(studentDiv);
}

// Function to fetch student data from API and create student elements
async function fetchAndCreateStudents() {
  const apiEndpoint = 'http://localhost:3000/api/images/download/all';

  try {
    console.log('Fetching data from:', apiEndpoint);

    const response = await fetch(apiEndpoint);
    console.log('Received response:', response);

    const studentsData = await response.json();
    console.log('Received students data:', studentsData);

    studentsData.forEach((student) => {
      console.log('Creating student with data:', student);
      createStudent(student.imageName, student.description, `data:image/*;base64,${student.imageData}`);
      console.log('Student created:', student);
    });

    console.log('All students created successfully.');
  } catch (error) {
    console.error('Error fetching or creating students:', error);
  }
}


// Call the function to fetch and create students
fetchAndCreateStudents();

// Function to generate binary codes (unchanged)
function generateBinaryCodes() {
  const binaryCodesContainer = document.getElementById("binary-codes-container");

  for (let i = 0; i < 50; i++) {
    const binaryCode = document.createElement("div");
    binaryCode.className = "binary-code";
    binaryCode.textContent = Math.random() > 0.5 ? "1" : "0";
    binaryCode.style.left = Math.random() * 100 + "vw";
    binaryCode.style.top = Math.random() * 100 + "vh";
    binaryCodesContainer.appendChild(binaryCode);
  }
}

// Call the function to generate binary codes
generateBinaryCodes();
