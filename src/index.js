'use strict';
const http = require('http');
const finalhandler = require('finalhandler');
const middl = require('middl');
const response = require('./response');

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

	// Patch request and response objects:
	app.use((req, res) => {
		response(res);
	});

	const _run = app.run;

	// Use finalhandler to respond with 404 and other errors when needed:
	app.run = (req, res) => {
		return _run(req, res)
			.then(() => finalhandler(req, res)())
			.catch(err => finalhandler(req, res)(err));
	};

	return app;
};
