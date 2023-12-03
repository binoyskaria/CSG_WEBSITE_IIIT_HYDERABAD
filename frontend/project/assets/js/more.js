
function toggleContent(event, sectionId) {
    event.preventDefault();
    var content = document.getElementById(sectionId + '-content');
    if (content.style.display === 'none') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
}
