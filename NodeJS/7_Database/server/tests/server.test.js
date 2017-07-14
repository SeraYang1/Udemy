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
	text: "second",
	completed: "true",
	completedAt: 333
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
				expect(res.body.todos.length).toBe(2)
				expect(res.body.todos[0]).toInclude({
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

describe('DELTE /todos/:id', () => {
  it('should delete todo doc', (done) => {
		var hexID = todos[0]._id.toHexString()
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos._id).toBe(hexID);
      })
      .end((err, res) => {
				//have to check what happens after the function to make sure it did something
				//unlike other funcs bc the others returned something, this has to do something
				if (err) {
					return done(err);
				}
				Todo.findById(hexID).then((todos) => {
					expect(todos).toNotExist();
					done();
				}).catch((e) => done(e));
			});
  });

	it('Doesnt do anything', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
			.delete(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	})

	it('Invalid ID', (done) => {
		request(app)
			.delete(`/todos/123}`)
			.expect(404)
			.end(done);
	})
})

describe('PATCH /todos/:id', () => {
	it('Update todo', (done) => {
		var hexID = todos[0]._id.toHexString()
		//calls the app (server) to execute
		request(app)
			//patch is the method called with the link parameter
			.patch(`/todos/${hexID}`)
			//need to send something as parameters
			.send({
				text:"Changed it",
				completed: true
			})
			.expect(200)
			//check the results are what we want
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexID);
				expect(res.body.todo.text).toBe("Changed it");
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA('number')
			})
			.end(done);
	})

	it('Clear completedAt when todo is not completed', (done) => {
		var hexID = todos[0]._id.toHexString()
		request(app)
			.patch(`/todos/${hexID}`)
			.send({
				text:"#2",
				completed: false
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexID);
				expect(res.body.todo.text).toBe("#2");
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toBe(null)
			})
			.end(done);
	})
})
