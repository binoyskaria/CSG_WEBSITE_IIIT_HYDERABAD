window.addEventListener("scroll", function () {
    var header = document.getElementById("header");
    // var logo = document.getElementById("logo-container");
    var nav = document.getElementById("nav");

    // Check if the page has been scrolled
    if (window.scrollY > 0) {
        header.classList.add("fixed-header");
        // logo.classList.add("fixed-logo");
        nav.classList.add("fixed-nav");
    } else {
        header.classList.remove("fixed-header");
        // logo.classList.remove("fixed-logo");
        nav.classList.remove("fixed-nav");
    }
});
