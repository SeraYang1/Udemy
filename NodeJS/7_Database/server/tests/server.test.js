const expect = require('expect')
const request = require('supertest')
const {
	ObjectID
} = require('mongodb')
const {
	app
} = require('./../server')
const {
	Todo
} = require('./../models/todo')

//creating an array of todos to start each test with
const todos = [{
	_id: new ObjectID("59671a67bdfcd8a855fd8625"),
	text: "first"
}, {
	_id: new ObjectID("59671a67bdfcd8a855fd8626"),
	text: "second"
}]
//run before each test case
beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos)
	}).then(() =>
		done())
})

describe('Post /Todos', () => {
	it("Create todo", (done) => {
		var text = 'Test todo text'

		request(app)
			.post('/todos')
			.send({
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text)
			})
			//need to add a function to end because its asynchronous
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find({
					text
				}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	})

	it("Invalid todo", (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => done(e));
			});
	})
})

describe('Get /Todos', () => {
	it("Gets all todos", (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.success.length).toBe(2)
				expect(res.body.success[0]).toInclude({
					text: 'first'
				})
			})
			.end(done)
	})
})

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(todos[0].text);
      })
      .end(done);
  });

	it('Return empty todo', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
			.get(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	})

	it('Invalid ID', (done) => {
		request(app)
			.get(`/todos/123}`)
			.expect(404)
			.end(done);
	})
})