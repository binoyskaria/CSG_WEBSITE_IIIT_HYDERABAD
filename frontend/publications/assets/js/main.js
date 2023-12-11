
$(document).ready(function () {

	// Add 'is-loading' class to the body when the page starts loading
    $('body').addClass('is-loading');

    // Function to remove 'is-loading' class after a short delay
    function removeLoadingClass() {
        $('body').removeClass('is-loading');
    }

    // Call removeLoadingClass after a short delay (e.g., 100 milliseconds)
    setTimeout(removeLoadingClass, 100);
    var header = $('#header');
    var timeout;

    $(document).mousemove(function (e) {
        var y = e.clientY;

        if (y > window.innerHeight - 100) {
            header.addClass('active');
            clearTimeout(timeout);

            // Hide the navbar after 2 seconds of inactivity
            timeout = setTimeout(function () {
                header.removeClass('active');
            }, 2000);
        }
    });





	
});



// Vertical Timeline - by CodyHouse.co
function VerticalTimeline(element) {
    this.element = element;
    this.blocks = this.element.getElementsByClassName("cd-timeline__block");
    this.images = this.element.getElementsByClassName("cd-timeline__img");
    this.contents = this.element.getElementsByClassName("cd-timeline__content");
    this.offset = 0.8;
    this.hideBlocks();
}

VerticalTimeline.prototype.hideBlocks = function () {
    if (!"classList" in document.documentElement) {
        return; // no animation on older browsers
    }
    // hide timeline blocks which are outside the viewport
    var self = this;
    for (var i = 0; i < this.blocks.length; i++) {
        (function (i) {
            if (self.blocks[i].getBoundingClientRect().top > window.innerHeight * self.offset) {
                self.images[i].classList.add("cd-timeline__img--hidden");
                self.contents[i].classList.add("cd-timeline__content--hidden");
            }
        })(i);
    }
};

VerticalTimeline.prototype.showBlocks = function () {
    if (!"classList" in document.documentElement) {
        return;
    }
    var self = this;
    for (var i = 0; i < this.blocks.length; i++) {
        (function (i) {
            if (self.contents[i].classList.contains("cd-timeline__content--hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight * self.offset) {
                // add bounce-in animation
                self.images[i].classList.add("cd-timeline__img--bounce-in");
                self.contents[i].classList.add("cd-timeline__content--bounce-in");
                self.images[i].classList.remove("cd-timeline__img--hidden");
                self.contents[i].classList.remove("cd-timeline__content--hidden");
            }
        })(i);
    }
};

var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
    verticalTimelinesArray = [],
    scrolling = false;
if (verticalTimelines.length > 0) {
    for (var i = 0; i < verticalTimelines.length; i++) {
        (function (i) {
            verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
        })(i);
    }

    // show timeline blocks on scrolling
    window.addEventListener("scroll", function (event) {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
        }
    });
}

function checkTimelineScroll() {
    verticalTimelinesArray.forEach(function (timeline) {
        timeline.showBlocks();
    });
    scrolling = false;
}

document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM content loaded. Fetching data from the server...');

    // Fetch data from the server
    fetch(apiUrl+'/api/publications/getPublications', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 1
            // Add any other headers as needed
        },
        // credentials: 'include', // Uncomment this line if you need to include credentials (cookies, etc.)
    })
        .then(response => {
            console.log('Response received:', response);
            return response.json();
        })
        .then(data => {
            console.log('Data received from the server:', data);

            // Get the timeline container
            const timelineContainer = document.getElementsByClassName('container max-width-lg cd-timeline__container')[0];

            // Iterate through each publication event and populate the HTML
            data.events.forEach(event => {
                var newTimeLineBlock = document.createElement("div");
                newTimeLineBlock.className = 'cd-timeline__block';

                newTimeLineBlock.innerHTML = `
                    <div class="cd-timeline__img cd-timeline__img--location">
                        <img src="assets/img/cd-icon-location.svg" alt="Location">
                    </div>
                    <div class="cd-timeline__content text-component">
                        <h2 id="title">${event.title}</h2>
                        <p class="color-contrast-medium">${event.body}</p>
                        <div class="flex justify-between items-center">
                            <span class="cd-timeline__date">${event.date}</span>
                        </div>
                    </div>
                `;

                // Append the populated block to the timeline container
                timelineContainer.appendChild(newTimeLineBlock);
            });

            // Instantiate the VerticalTimeline after populating the timeline container
            verticalTimelinesArray.forEach(function (timeline) {
                timeline.hideBlocks(); // optional: hide blocks initially
            });
        })
        .catch(error => console.error('Error fetching publications:', error));
});
