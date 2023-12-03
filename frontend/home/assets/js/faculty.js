document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the image is visible
    });
  
    const images = document.querySelectorAll('.wrapper.style1.special img');
    images.forEach(img => observer.observe(img));
  });
  