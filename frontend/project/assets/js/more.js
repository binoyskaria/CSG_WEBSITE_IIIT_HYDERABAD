// Define toggleSummary function
function toggleSummary(id, event) {
    event.preventDefault(); // Prevent the default behavior of the link

    const contentElement = document.getElementById(id);

    if (contentElement) {
        // Toggle the display property
        contentElement.style.display = (contentElement.style.maxHeight === '0px') ? '1000px' : '0px';

        // Toggle the show class for the fade-in effect
        contentElement.classList.toggle('show');
    }
}
