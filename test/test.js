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
		.expect('Content-Type', 'text/plain')
		.expect(200)
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
		.expect('Content-Type', 'text/plain')
		.expect(404)
		.end(t.end);
});
