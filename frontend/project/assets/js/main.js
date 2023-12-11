/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


(function ($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
	breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Header.
	if ($banner.length > 0
		&& $header.hasClass('alt')) {

		$window.on('resize', function () { $window.trigger('scroll'); });

		$banner.scrollex({
			bottom: $header.outerHeight(),
			terminate: function () { $header.removeClass('alt'); },
			enter: function () { $header.addClass('alt'); },
			leave: function () { $header.removeClass('alt'); }
		});

	}

	// Menu.
	var $menu = $('#menu');

	$menu._locked = false;

	$menu._lock = function () {

		if ($menu._locked)
			return false;

		$menu._locked = true;

		window.setTimeout(function () {
			$menu._locked = false;
		}, 350);

		return true;

	};

	$menu._show = function () {

		if ($menu._lock())
			$body.addClass('is-menu-visible');

	};

	$menu._hide = function () {

		if ($menu._lock())
			$body.removeClass('is-menu-visible');

	};

	$menu._toggle = function () {

		if ($menu._lock())
			$body.toggleClass('is-menu-visible');

	};

	$menu
		.appendTo($body)
		.on('click', function (event) {

			event.stopPropagation();

			// Hide.
			$menu._hide();

		})
		.find('.inner')
		.on('click', '.close', function (event) {

			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();

			// Hide.
			$menu._hide();

		})
		.on('click', function (event) {
			event.stopPropagation();
		})
		.on('click', 'a', function (event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$menu._hide();

			// Redirect.
			window.setTimeout(function () {
				window.location.href = href;
			}, 350);

		});

	$body
		.on('click', 'a[href="#menu"]', function (event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
			$menu._toggle();

		})
		.on('keydown', function (event) {

			// Hide on escape.
			if (event.keyCode == 27)
				$menu._hide();

		});

})(jQuery);



document.addEventListener('DOMContentLoaded', async function () {
    // Function to make AJAX request and populate content
    async function populateContent() {
        try {
            // Make an AJAX request to your getProjects API
            const response = await fetch(apiUrl+'/api/projects/getProjects'); // Update the URL as needed
            const data = await response.json();

            // Log the received data for debugging
            console.log('Received data:', data);

            // Assuming the response has a 'projects' property containing an array of projects
            const projects = data.projects;

            // Log the number of projects for debugging
            console.log('Number of projects:', projects.length);

            // Reference to the wrapper element
            const wrapper = document.getElementById('wrapper');

            // Iterate through projects and dynamically create HTML content
            projects.forEach((project, index) => {
    console.log('Processing project:', project);

    const section = document.createElement('section');

    // Add common classes to all sections
    section.classList.add('wrapper', 'style2');

    // Add additional classes based on even or odd index
    if (index % 2 === 0) {
        section.classList.add('alt', 'spotlight');
    } else {
        section.classList.add('spotlight');
    }

    section.innerHTML = `
    <div class="inner">
        <div class="content">
            <h2 class="major">${project.title}</h2>
            <p>${project.faculty}</p>
            <p>${project.companyfund}</p>
            <p>${project.date}</p>

			${project.summary ? `

            <a href="#" class="special" onclick="toggleSummary('${project.title}-content',event)">Summary</a>
            ${project.summary ? `<div class="additional-content" id="${project.title}-content" style="maxHeight: 0px;">
                <p>${project.summary}</p>
            </div>` : ''}

			` : ''}

        </div>
    </div>`;

    // Log the created section for debugging
    console.log('Created section:', section);

    wrapper.appendChild(section);
});

        } catch (error) {
            console.error('Error fetching projects:', error);
            // Handle errors as needed
        }
    }

    // Call the function to populate content when the DOM is loaded
    populateContent();
});
