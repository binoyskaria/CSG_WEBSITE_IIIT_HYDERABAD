/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);


document.addEventListener('DOMContentLoaded', function () {
	// Function to make AJAX request and populate content
	async function populateContent() {
	  try {
		// Make an AJAX request to your getProjects API
		const response = await fetch('http://localhost:3000/api/projects/getProjects'); // Update the URL as needed
		const data = await response.json();
  
		// Assuming the response has a 'projects' property containing an array of projects
		const projects = data.projects;
  
		// Reference to the wrapper element
		const wrapper = document.getElementById('wrapper');
  
		// Iterate through projects and dynamically create HTML content
		projects.forEach((project) => {
		  const section = document.createElement('section');
		  section.classList.add('wrapper', 'alt', 'spotlight', 'style2');
  
		  section.innerHTML = `
			<div class="inner">
			  <div class="content">
				<h2 class="major">${project.title}</h2>
				<p>${project.faculty}</p>
				<p>${project.companyfund}</p>
				<p>${project.date}</p>
				<a href="#" class="special" onclick="toggleContent(event, 'section-${project.title.replace(/\s+/g, '-')}')">Summary</a>
				<div class="additional-content" id="section-${project.title.replace(/\s+/g, '-').toLowerCase()}-content" style="display: none;">
				  <p>${project.summary}</p>
				</div>
			  </div>
			</div>
		  `;
  
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
  