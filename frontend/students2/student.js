

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

// Generate binary codes


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


createStudent("Adhish Singla", "B.Tech. Hons. + MS", "student_image/adhish.jpg");
createStudent("Shrenik Jain", "B.Tech. Hons. + MS", "student_image/shrenik.jpg");
createStudent("Vinamra Banera", "B.Tech. Hons. + MS", "student_image/vinamra.jpg");
createStudent("Yash Khandelwal", "B.Tech. Hons. + MS", "student_image/yash.jpg");
createStudent("Ziaul Choudhury", "Ph.D.", "student_image/ziaul.png");
createStudent("Sai Manish", "B.Tech. Hons.", "student_image/manish.jpg");
createStudent("Karthik Ganti", "B.Tech. Hons.", "student_image/karthik.jpg");
createStudent("Sai Sukumar", "B.Tech. Hons.", "student_image/sukumar.jpg");
createStudent("Sreevatsav", "B.Tech. Hons.", "student_image/srivatsava.jpg");
createStudent("Akshaj Gupta", "B.Tech. Hons. + MS", "student_image/akshaj.jpg");
createStudent("Amal Santosh", "B.Tech. Hons. + MS", "student_image/amal.jpg");
createStudent("Praneeth", "B.Tech. Hons.", "student_image/praneeth.jpg");
createStudent("Shashwat Khandelwal", "B.Tech. Hons. + MS", "student_image/khandelwal.jpg");
createStudent("Shashwat Srivastava", "B.Tech. Hons. + MS", "student_image/srivatsava.jpg");
createStudent("Pratik Jain", "B.Tech. Hons.", "student_image/pratik.jpg");
createStudent("Anish Gulati", "B.Tech. Hons. + MS", "student_image/anish.jpg");
createStudent("Kunal Garg", "B.Tech. Hons.", "student_image/kunal.jpg");
createStudent("Geethika", "B.Tech. Hons.", "student_image/geetika.jpg");

generateBinaryCodes();

