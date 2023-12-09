function getToken() {
    console.log("token is:    " + localStorage.getItem('token'));
    return localStorage.getItem('token');
}



//addStudent
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('imageUploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');

    const file = imageInput.files[0];

    if (!file || !titleInput.value || !descriptionInput.value) {
        alert('Please fill in all fields and select an image');
        return;
    }

    console.log('Form data collected:', {
        file,
        title: titleInput.value,
        description: descriptionInput.value,
    });

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', titleInput.value);
    formData.append('description', descriptionInput.value);


    console.log('Form data ready for upload:', formData);

    uploadImage(formData);
});



function uploadImage(formData) {
    console.log('Uploading image...');

    fetch('http://localhost:3000/api/admin/upload', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
        },
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Image uploaded successfully:', data);




            const filenameInput = document.getElementById('titleInput');
            filenameInput.value = data.imageUrl; // Use the uploaded filename for downloading
            alert('Image uploaded successfully!');
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        });
}

//addPublication
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('addPublicationButton').addEventListener('click', function () {
    const publicationTitleInput = document.getElementById('publicationTitleInput');
    const publicationDateInput = document.getElementById('publicationDateInput');
    const publicationDescriptionInput = document.getElementById('publicationDescriptionInput');

    const publicationData = {
        title: publicationTitleInput.value,
        date: publicationDateInput.value,
        description: publicationDescriptionInput.value,
    };

    console.log('Publication data collected:', publicationData);

    addPublication(publicationData);
});
function addPublication(publicationData) {
    console.log('Adding publication...');

    fetch('http://localhost:3000/api/admin/addPublication', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(publicationData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Publication added successfully:', data);
            // You can update the timeline or perform other actions as needed
            alert('Publication added successfully!');
        })
        .catch(error => {
            console.error('Error adding publication:', error.message);
            alert('Failed to add publication. Please try again. Error: ' + error.message);
        });
}



//addProject
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addProject(projectData) {
    console.log('Adding project...');

    fetch('http://localhost:3000/api/admin/addProject', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Project added successfully:', data);
            // You can update the UI or perform other actions as needed
            alert('Project added successfully!');
        })
        .catch(error => {
            console.error('Error adding project:', error.message);
            alert('Failed to add project. Please try again.');
        });
}


document.getElementById('addProjectButton').addEventListener('click', function () {
    const projectData = {
        title: document.getElementById('projectTitleInput').value,
        faculty: document.getElementById('projectFacultyInput').value,
        companyfund: document.getElementById('projectCompanyFundInput').value,
        date: document.getElementById('projectDateInput').value,
        summary: document.getElementById('projectSummaryInput').value,
    };

    addProject(projectData);
});

//addFaculty
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('facultyImageUploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const imageInput = document.getElementById('facultyImageInput');
    const titleInput = document.getElementById('facultyTitleInput');
    const descriptionInput = document.getElementById('facultyDescriptionInput');

    const file = imageInput.files[0];

    if (!file || !titleInput.value || !descriptionInput.value) {
        alert('Please fill in all fields and select an image');
        return;
    }

    console.log('Form data collected:', {
        file,
        title: titleInput.value,
        description: descriptionInput.value,
    });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', titleInput.value);
    formData.append('description', descriptionInput.value);

    console.log('Form data ready for upload:', formData);

    uploadFacultyImage(formData);
});

function uploadFacultyImage(formData) {
    console.log('Uploading faculty image...');

    fetch('http://localhost:3000/api/admin/facultyUpload', {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
        },
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Faculty Image uploaded successfully:', data);

            // If you want to do something with the response, you can add code here

            alert('Faculty Image uploaded successfully!');
        })
        .catch(error => {
            console.error('Error uploading faculty image:', error);
            alert('Failed to upload faculty image. Please try again.');
        });
}


//addFocusSevenPublication
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addFocusSevenPublication(publicationData) {
    console.log('Adding or updating FocusSevenPublication...');

    fetch('http://localhost:3000/api/admin/addFocusSevenPublication', {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'application/json', // Combine headers
        },
        method: 'POST',
        body: JSON.stringify(publicationData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received from server:', data);
            console.log('FocusSevenPublication added/updated successfully:', data);
            // You can update the UI or perform other actions as needed
            alert('FocusSevenPublication added/updated successfully!');
        })
        .catch(error => {
            console.error('Error adding/updating FocusSevenPublication:', error);
            alert('Failed to add/update FocusSevenPublication. Please try again.');
        });
}

document.getElementById('addFocusSevenPublicationButton').addEventListener('click', function () {
    console.log('Add FocusSevenPublication button clicked');

    const publicationData = {
        title: document.getElementById('FocuspublicationTitleInput').value,
        author: document.getElementById('FocuspublicationAuthorInput').value,
        link: document.getElementById('FocuspublicationLinkInput').value,
        index: document.getElementById('FocuspublicationIndexInput').value,
    };

    console.log('Publication data:', publicationData);

    addFocusSevenPublication(publicationData);
});




//adminLogin
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function submitLoginForm() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    try {
        const response = await fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store the token securely (e.g., in local storage)
            localStorage.setItem('token', data.token);
            console.log('Login successful');
            window.location.href = './adminDashboard.html';
        } else {
            console.error('Login failed');
            // Handle failed login (show error message, etc.)
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Handle error (show error message, etc.)
    }
}



document.getElementById('imageInput').addEventListener('change', function () {
    const fileInputLabel = document.querySelector('label[for="imageInput"]');
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length > 0) {
        // Image is selected
        fileInputLabel.style.backgroundColor = 'green';
        fileInputLabel.innerHTML = "Image Selected";
    } else {
        // No image selected, reset to default
        fileInputLabel.style.backgroundColor = '#3498db';
        fileInputLabel.innerHTML = "Image Selected";
    }
});


document.getElementById('facultyImageInput').addEventListener('change', function () {
    const fileInputLabel = document.querySelector('label[for="facultyImageInput"]');
    const fileInput = document.getElementById('facultyImageInput');
    if (fileInput.files.length > 0) {
        // Image is selected
        fileInputLabel.style.backgroundColor = 'green';
        fileInputLabel.innerHTML = "Image Selected";
    } else {
        // No image selected, reset to default
        fileInputLabel.style.backgroundColor = '#3498db';
        fileInputLabel.innerHTML = "Image Selected";
    }
});



// Logout function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function logout() {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page
    window.location.href = './login.html'; // Replace with the actual path to your login page
}

// Add an event listener to the logout button or link
document.getElementById('logoutButton').addEventListener('click', function () {
    logout();
});
