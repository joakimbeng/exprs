'use strict';
const mime = require('mime');

module.exports = exports = function (res) {
	res.status = status.bind(null, res);
	res.type = type.bind(null, res);
};

function status(res, code) {
	res.statusCode = code;
	return res;
}

function type(res, contentType) {
	if (contentType.indexOf('/') === -1) {
		contentType = mime.lookup(contentType);
	}
	res.setHeader('Content-Type', contentType);
	return res;
}
