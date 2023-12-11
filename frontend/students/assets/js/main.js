/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch?
	if (browser.mobile)
		$body.addClass('is-touch');

	// Forms.
	var $form = $('form');

	// Auto-resizing textareas.
	$form.find('textarea').each(function () {

		var $this = $(this),
			$wrapper = $('<div class="textarea-wrapper"></div>'),
			$submits = $this.find('input[type="submit"]');

		$this
			.wrap($wrapper)
			.attr('rows', 1)
			.css('overflow', 'hidden')
			.css('resize', 'none')
			.on('keydown', function (event) {

				if (event.keyCode == 13
					&& event.ctrlKey) {

					event.preventDefault();
					event.stopPropagation();

					$(this).blur();

				}

			})
			.on('blur focus', function () {
				$this.val($.trim($this.val()));
			})
			.on('input blur focus --init', function () {

				$wrapper
					.css('height', $this.height());

				$this
					.css('height', 'auto')
					.css('height', $this.prop('scrollHeight') + 'px');

			})
			.on('keyup', function (event) {

				if (event.keyCode == 9)
					$this
						.select();

			})
			.triggerHandler('--init');

		// Fix.
		if (browser.name == 'ie'
			|| browser.mobile)
			$this
				.css('max-height', '10em')
				.css('overflow-y', 'auto');

	});

	// Menu.
	var $menu = $('#menu');

	$menu.wrapInner('<div class="inner"></div>');

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
		})
		.on('click', 'a', function (event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$menu._hide();

			// Redirect.
			if (href == '#menu')
				return;

			window.setTimeout(function () {
				window.location.href = href;
			}, 350);

		})
		.append('<a class="close" href="#menu">Close</a>');

	$body
		.on('click', 'a[href="#menu"]', function (event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
			$menu._toggle();

		})
		.on('click', function (event) {

			// Hide.
			$menu._hide();

		})
		.on('keydown', function (event) {

			// Hide on escape.
			if (event.keyCode == 27)
				$menu._hide();

		});

})(jQuery);





// Function to fetch data from the API
async function fetchDataFromAPI() {
	try {
		console.log('Fetching data from the API...');
		const response = await fetch(apiUrl + '/api/images/download/all', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 1
				// Add any other headers as needed
			},
			// credentials: 'include', // Uncomment this line if you need to include credentials (cookies, etc.)
		}); // Update the URL based on your actual API endpoint
		console.log('API response received:', response);

		const data = await response.json();
		console.log('Data from the API:', data);

		return data;
	} catch (error) {
		console.error('Error fetching data from the API:', error);
		throw error;
	}
}

// Function to create and append articles to the DOM
function appendArticlesToDOM(articles) {
	console.log('Appending articles to the DOM...');
	const tilesSection = document.querySelector('.tiles');
	let currentStyleIndex = 0;

	articles.forEach((article) => {
		const articleElement = document.createElement('article');
		articleElement.classList.add(`style${currentStyleIndex + 1}`);

		articleElement.innerHTML = `
		<span class="image">
		  <img src="data:image/jpeg;base64,${article.imageData}" alt="${article.title}" />
		</span>
		<a href="javascript:void(0);">
		  <h2>${article.title}</h2>
		  <div class="content">
			<p>${article.description}</p>
		  </div>
		</a>
	  `;

		tilesSection.appendChild(articleElement);
		currentStyleIndex = (currentStyleIndex + 1) % 6;
	});

	console.log('Articles appended to the DOM.');
}

async function fetchDataAndPopulateArticles() {
	try {
		console.log('Fetching data and populating articles...');
		const data = await fetchDataFromAPI();
		console.log('Data received:', data);

		appendArticlesToDOM(data);
	} catch (error) {
		// Handle errors as needed
		console.error('Error fetching data and populating articles:', error);
	}
}

// Trigger the data fetching and population process
fetchDataAndPopulateArticles();
