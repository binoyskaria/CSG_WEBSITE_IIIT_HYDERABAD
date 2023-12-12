/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

function doloading() {
	var $body = document.body,
		$wrap = document.getElementById('wrap'),

		areawidth = window.innerWidth,
		areaheight = window.innerHeight,

		canvassize = 500,

		length = 30,
		radius = 5.6,

		rotatevalue = 0.035,
		acceleration = 0,
		animatestep = 0,
		toend = false,

		pi2 = Math.PI * 2,

		group = new THREE.Group(),
		mesh, ringcover, ring,

		camera, scene, renderer;


	camera = new THREE.PerspectiveCamera(65, 1, 1, 10000);
	camera.position.z = 150;

	scene = new THREE.Scene();
	// scene.add(new THREE.AxisHelper(30));
	scene.add(group);

	mesh = new THREE.Mesh(
		new THREE.TubeGeometry(new (THREE.Curve.create(function () { },
			function (percent) {

				var x = length * Math.sin(pi2 * percent),
					y = radius * Math.cos(pi2 * 3 * percent),
					z, t;

				t = percent % 0.25 / 0.25;
				t = percent % 0.25 - (2 * (1 - t) * t * -0.0185 + t * t * 0.25);
				if (Math.floor(percent / 0.25) == 0 || Math.floor(percent / 0.25) == 2) {
					t *= -1;
				}
				z = radius * Math.sin(pi2 * 2 * (percent - t));

				return new THREE.Vector3(x, y, z);

			}
		))(), 200, 1.1, 2, true),
		new THREE.MeshBasicMaterial({
			color: 0xffffff
			// , wireframe: true
		})
	);
	group.add(mesh);

	ringcover = new THREE.Mesh(new THREE.PlaneGeometry(50, 15, 1), new THREE.MeshBasicMaterial({ color: 0xd1684e, opacity: 0, transparent: true }));
	ringcover.position.x = length + 1;
	ringcover.rotation.y = Math.PI / 2;
	group.add(ringcover);

	ring = new THREE.Mesh(new THREE.RingGeometry(4.3, 5.55, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0, transparent: true }));
	ring.position.x = length + 1.1;
	ring.rotation.y = Math.PI / 2;
	group.add(ring);

	// fake shadow
	(function () {
		var plain, i;
		for (i = 0; i < 10; i++) {
			plain = new THREE.Mesh(new THREE.PlaneGeometry(length * 2 + 1, radius * 3, 1), new THREE.MeshBasicMaterial({ color: 0xd1684e, transparent: true, opacity: 0.13 }));
			plain.position.z = -2.5 + i * 0.5;
			group.add(plain);
		}
	})();

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(canvassize, canvassize);
	renderer.setClearColor('#d1684e');

	$wrap.appendChild(renderer.domElement);

	$body.addEventListener('mousedown', start, false);
	$body.addEventListener('touchstart', start, false);
	$body.addEventListener('mouseup', back, false);
	$body.addEventListener('touchend', back, false);

	animate();


	function start() {
		toend = true;
	}

	function back() {
		toend = false;
	}

	function tilt(percent) {
		group.rotation.y = percent * 0.5;
	}

	function render() {

		var progress;

		animatestep = Math.max(0, Math.min(240, toend ? animatestep + 1 : animatestep - 4));
		acceleration = easing(animatestep, 0, 1, 240);

		if (acceleration > 0.35) {
			progress = (acceleration - 0.35) / 0.65;
			group.rotation.y = -Math.PI / 2 * progress;
			group.position.z = 50 * progress;
			progress = Math.max(0, (acceleration - 0.97) / 0.03);
			mesh.material.opacity = 1 - progress;
			ringcover.material.opacity = ring.material.opacity = progress;
			ring.scale.x = ring.scale.y = 0.9 + 0.1 * progress;
		}

		renderer.render(scene, camera);

	}

	function animate() {
		mesh.rotation.x += rotatevalue + acceleration;
		render();
		requestAnimationFrame(animate);
	}

	function easing(t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t + b; return c / 2 * ((t -= 2) * t * t + 2) + b; }


}






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







function removeloading() {
	const fullSection = document.getElementById("full");
	const wrapSection = document.getElementById("wrap");
	if (fullSection) {

		wrapSection.remove();
		fullSection.remove();

	}
}

// Function to show a loading spinner
function showLoadingSpinner() {

	doloading();
}

// Function to hide the loading spinner
function hideLoadingSpinner() {

	removeloading();

}

// Function to fetch data from the API
async function fetchDataFromAPI() {
	try {
		showLoadingSpinner(); // Show loading spinner while fetching data
		console.log('Fetching data from the API...');
		const response = await fetch(apiUrl + '/api/images/download/all', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 1
				// Add any other headers as needed
			},
			// credentials: 'include', // Uncomment this line if you need to include credentials (cookies, etc.)
		});
		console.log('API response received:', response);

		const data = await response.json();
		console.log('Data from the API:', data);

		hideLoadingSpinner(); // Hide loading spinner when data is loaded

		return data;
	} catch (error) {
		hideLoadingSpinner(); // Hide loading spinner on error
		console.error('Error fetching data from the API:', error);
		throw error;
	}
}

// Function to create and append articles to the DOM
function appendArticlesToDOM(articles) {
	console.log('Appending articles to the DOM...');
	const tilesSection = document.getElementsByClassName('tiles');
	let currentStyleIndex = 0;

	articles.forEach((article) => {
		if (article.description == "B.Tech.Hons.") {
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

			tilesSection[2].appendChild(articleElement);
			currentStyleIndex = (currentStyleIndex + 1) % 6;
		}
		else if (article.description == "B.Tech.Hons.+MS") {
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

			tilesSection[1].appendChild(articleElement);
			currentStyleIndex = (currentStyleIndex + 1) % 6;
		}
		else if (article.description == "Ph.D.") {
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

			tilesSection[0].appendChild(articleElement);
			currentStyleIndex = (currentStyleIndex + 1) % 6;
		}

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
