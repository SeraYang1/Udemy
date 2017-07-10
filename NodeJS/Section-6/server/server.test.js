const request = require('supertest');
const expect = require('expect')

var app = require('./server').app;

it("Hello World test", (done) => {
	request(app)
		.get('/')
		.expect(200)
		.expect('Hello World')
		.end(done);
})

it("Users test", (done) => {
	request(app)
		.get('/users')
		.expect(200)
		.expect((res) => {
			expect(res.body).toInclude({
					name: 'Sera',
					age: 19
			})
		})
		.end(done);
})
