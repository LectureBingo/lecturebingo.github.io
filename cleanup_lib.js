var recursive = require('recursive-readdir');
var fs = require('fs');

/**
 * Paths relative to www. Glob syntax.
 */

var essential = JSON.parse(fs.readFileSync('cleanup_lib_definitions.json', 'utf-8'));

function remover (err, files) {
	files.forEach(function (file) {
		console.log('Unlinked ' + file);
		fs.unlinkSync(file);
	});
};

recursive('bower_components', essential, remover);
recursive('node_modules', essential, remover);