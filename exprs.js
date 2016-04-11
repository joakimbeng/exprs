'use strict';
const exprs = require('./src');
const app = exprs();

app.get('/test', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('ok\n');
});

app.listen(3000);
