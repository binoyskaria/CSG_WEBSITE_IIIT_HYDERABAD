
document.getElementById('imageUploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];

    if (!file) {
        alert('Please select an image');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    uploadImage(formData);
});

document.getElementById('publicationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const titleInput = document.getElementById('titleInput');
    const dateInput = document.getElementById('dateInput');
    const descriptionInput = document.getElementById('descriptionInput');

    const publicationData = {
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
    };

    addPublication(publicationData);
});

function uploadImage(formData) {
    fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Image uploaded successfully:', data);

        const filenameInput = document.getElementById('filenameInput');
        filenameInput.value = data.imageUrl; // Use the uploaded filename for downloading
    })
    .catch(error => {
        console.error('Error uploading image:', error);
    });
}

function addPublication(publicationData) {
    fetch('http://localhost:3000/api/addPublication', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(publicationData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Publication added successfully:', data);
        // You can update the timeline or perform other actions as needed
    })
    .catch(error => {
        console.error('Error adding publication:', error);
    });
}

document.getElementById('downloadButton').addEventListener('click', function () {
    const filenameInput = document.getElementById('filenameInput');
    const filename = filenameInput.value;

    if (!filename) {
        alert('Please enter a filename');
        return;
    }

    downloadImage(filename);
});

function downloadImage(filename) {
    fetch(`http://localhost:3000/api/download/${filename}`, {
        method: 'GET',
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);

        // Set the src attribute of the image element to the downloaded image URL
        const downloadedImage = document.getElementById('downloadedImage');
        downloadedImage.src = url;

        // Display the image container
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.style.display = 'block';
    })
    .catch(error => {
        console.error('Error downloading image:', error);
    });
}