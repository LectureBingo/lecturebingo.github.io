(function (win, head) {
	var ts = +new Date;
	win.LB_LOADCORE.forEach(function (src) {
		if (src.indexOf('.css') > 0) {
			var elem = document.createElement('LINK');
			elem.href = src + '?ts=' + ts;
			elem.type = 'text/css';
			elem.rel = 'stylesheet';
		}
		else {
			var elem = document.createElement('SCRIPT');
			elem.src = src + '?ts=' + ts;
		}
		head.appendChild(elem);
	});
})(window, document.head);
