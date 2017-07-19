const {ObjectID} = require('mongodb')
const{Todo} = require('./../../models/todo')
const
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

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos)
	}).then(() =>
		done())
}

module.exports = {
  todos,
  populateTodos
}
