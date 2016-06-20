import test from 'ava';
import supertest from 'supertest';
import exprs from '../src';

test('exprs().listen is a function', t => {
	t.is(typeof exprs().listen, 'function');
});
test('exprs().all is a function', t => {
	t.is(typeof exprs().all, 'function');
});

test.cb('get requests', t => {
	const app = exprs();
	app.get('/testing', (req, res) => {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('ok\n');
	});
	supertest(app)
		.get('/testing')
		.expect(200)
		.expect('Content-Type', 'text/plain')
		.end(t.end);
});

test.cb('all requests', t => {
	const app = exprs();
	app.all('/testing', (req, res) => {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('ok\n');
	});
	supertest(app)
		.delete('/testing')
		.expect(200)
		.expect('Content-Type', 'text/plain')
		.end(t.end);
});

test.cb('no handler for route', t => {
	const app = exprs();
	app.get('/testing', (req, res) => {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('ok\n');
	});
	supertest(app)
		.get('/testing-something-else')
		.expect(404)
		.end(t.end);
});

test.cb('res.status() convenience function', t => {
	const app = exprs();
	app.get('/testing', (req, res) => {
		res.status(200);
		res.setHeader('Content-Type', 'text/plain');
		res.end('ok\n');
	});
	supertest(app)
		.get('/testing')
		.expect(200)
		.expect('Content-Type', 'text/plain')
		.end(t.end);
});

test.cb('res.type() convenience function', t => {
	const app = exprs();
	app.get('/testing', (req, res) => {
		res.status(200);
		res.type('html');
		res.end('<strong>ok</strong>\n');
	});
	supertest(app)
		.get('/testing')
		.expect(200)
		.expect('Content-Type', 'text/html')
		.end(t.end);
});
