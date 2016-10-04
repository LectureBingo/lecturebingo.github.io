(function () {
	window.addEventListener('load', function () {
		var loading = document.getElementById('loading');
		var emoticons = "🙂 😊 😀 😁 😃 😄 😆 😍 😠 😡 😞 😟 😣 😖 😢 😭 😂 😨 😧 😦 😱 😫 😩 😮 😯 😲 😗 😙 😚 😘 😍 😉 😜 😘 😛 😝 😜 🤑 🤔 😕 😟 😐 😑 😳 😞 😖 🤐 😶 😇 👼 😈 😎 😪 😏 😒 😵 😕 🤕 🤒 😷 🤢".split(' ');
		loading.children[0].innerHTML = emoticons[Math.floor(Math.random() * 61)];
		loading.style.display = 'inline-block';

		var interval = setInterval(function () {
			if (loading.style.display === 'none') {
				clearInterval(interval);
			}
			else {
				loading.children[0].innerHTML = emoticons[Math.floor(Math.random() * 61)];
			}
		}, 200);
	});
})();
