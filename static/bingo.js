(function () {
	window.addEventListener('load', function () {
		var bell = document.getElementById('bell');
		var html5Test = document.getElementById('html5-test');
		var loading = document.getElementById('loading');

		var backgrounds = [
			"/static/backgrounds/wallpaper1.jpg",
			"/static/backgrounds/wallpaper2.jpg",
			"/static/backgrounds/wallpaper3.jpg",
			"/static/backgrounds/wallpaper4.png",
			"/static/backgrounds/wallpaper5.jpg",
			"/static/backgrounds/wallpaper6.jpg",
			"/static/backgrounds/wallpaper7.jpg",
			"/static/backgrounds/wallpaper8.jpg",
			"/static/backgrounds/wallpaper9.jpg"
		];

		document.body.style.backgroundImage = 'url(' + backgrounds[Math.floor(Math.random() * backgrounds.length)] + ')';

		var emoticons = "🙂 😊 😀 😁 😃 😄 😆 😍 😠 😡 😞 😟 😣 😖 😢 😭 😂 😨 😧 😦 😱 😫 😩 😮 😯 😲 😗 😙 😚 😘 😍 😉 😜 😘 😛 😝 😜 🤑 🤔 😕 😟 😐 😑 😳 😞 😖 🤐 😶 😇 👼 😈 😎 😪 😏 😒 😵 😕 🤕 🤒 😷 🤢";
		loading.children[0].innerHTML = emoticons.split(' ')[Math.floor(Math.random() * 61)];
		loading.style.display = 'inline-block';

		// Detect whether HTML5 audio playback is restricted
		if (html5Test.canPlayType) {
			html5Test.load();
			html5Test.play();

			// HTML5 is restrictive
			if (html5Test.paused) {
				swal({
					title: "Welcome!",
					text: "Please click Continue. This is necessary for the bell to work on mobile devices!",
					confirmButtonText: "Continue",
					type: "info"
				}, function () {
					// Play the bell sound
					bell.play();
					setTimeout(function () {
						// Seek to right before the end of the track to make
						// the notification on androids disappear
						bell.onpause = function () {
							bell.currentTime = bell.duration - 0.00001;
							bell.play();
							bell.onpause = null;
						};

						bell.pause();
					}, 80);
				});
			}
		}

		// Connect to socket.io server
		var socket = io.connect(window.LB_DEPLOYMENT_URL);

		// Variable that'll hold the state object
		var state;

		// Function that checks whether a state has a bingo
		function isBingo (newState, state) {
			return (newState.q % 5 === 0 && newState.q > 0 && state.q % 5 !== 0) ||
				(newState.c % 5 === 0 && newState.c > 0 && state.c % 5 !== 0) ||
				(newState.v % 5 === 0 && newState.v > 0 && state.v % 5 !== 0);
		};

		// Shows the state in the DOM
		function representState () {
			loading.style.display = 'none';
			for (var key in state) {
				if (state.hasOwnProperty(key)) {
					var elem = document.getElementById('score-' + key);
					elem.innerHTML = state[key] + ' ' + key.toUpperCase();
					elem.parentNode.style.display = 'inline-block';
				}
			}
		};

		// Ring the bell when a bell event is received
		socket.on('bell', function () {
			bell.currentTime = 0.1;
			bell.play();
		});

		// New state received
		socket.on('state', function (newState) {
			// If the state variable is not empty, and the new state has a bingo,
			// ring the bell!
			if (state && isBingo(newState, state)) {
				bell.currentTime = 0.1;
				bell.play();
			}

			state = newState;

			representState()
		});

		socket.on('reload', function () {
			location.reload();
		});

		// The admin reset the state to some values, don't check for bingo
		socket.on('reset state', function (newState) {
			state = newState;

			representState();
		});
	});
})();