var express = require('express')
var bodyParser = require('body-parser')

var {
	mongoose
} = require('./db/mongoose')
var {
	Todo
} = require('./models/todo')
var {
	User
} = require('./models/users')

var app = express();

//middleware that allows us to send json to express
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	//only creates a documnet, doesn't actually save it yet
	var newTodo = new Todo({
		text: req.body.text
	});

	//don't need the promise, only include it if you want to do something after saving it
	newTodo.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((success) => {
		res.send({
			success
		})
    console.log(JSON.stringify(success, undefined, 2))
	}, (fail) => res.status(400).send(fail))
})

app.listen(3000, () => {
	console.log('Started on port 3000')
})

module.exports = {
	app
}
