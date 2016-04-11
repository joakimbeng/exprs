'use strict';
const http = require('http');
const middl = require('middl');

module.exports = exports = function () {
	const app = middl({pathProperty: 'url'});

	// Adding all app.METHOD() functions à la Express:
	http.METHODS.forEach(method => {
		app[method.toLowerCase()] = app.match({method});
	});

	// Also the app.all():
	app.all = (path, fn) => {
		http.METHODS.forEach(method => {
			app[method.toLowerCase()](path, fn);
		});
		return app;
	};

	// Add the convenient `listen` function:
	app.listen = function () {
		const server = http.createServer(app);
		return server.listen.apply(server, arguments);
	};

	// Default NOT FOUND-route
	app.use(function *(req, res, next) {
		yield next();
		if (!res.headersSent) {
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.end(http.STATUS_CODES['404']);
		}
	});

	return app;
};
