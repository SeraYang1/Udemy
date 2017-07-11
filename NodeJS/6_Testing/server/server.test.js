const request = require('supertest');
const expect = require('expect')

var app = require('./server').app;

//describe groups the tests so that they are easier to read
describe('Server', () => {
	describe('Get /', () => {
		//it is the actual test ('name of test', () => {function})
		//(done) is for async, so the test knows to wait for the method to execute
		it("Hello World test", (done) => {
			request(app)
				.get('/')
				.expect(200)
				.expect('Hello World')
				.end(done);
		})
	})
	describe('Get /users', () => {
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
	})
})
