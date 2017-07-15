require('./config.js')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const _ = require('lodash')

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
//HEROKU - make sure you change the port to be a global port
const port = process.env.PORT || 3000

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
	Todo.find().then((todos) => {
		res.send({
			todos
		})
    //console.log(JSON.stringify(todos, undefined, 2))
	}, (fail) => res.status(400).send(fail))
})

//:id allows us to fetch what was entered in as params
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send("ID: "+id+ " is not valid")
	}

	Todo.findById(id).then((todos) => {
		if(!todos){
			return res.status(404).send("Could not find ID: "+id)
		}
		return res.status(200).send(todos)
	}).catch((e) => res.status(400).send("Error fetching ID"))
})

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send("ID: "+id+ " is not valid")
	}

	Todo.findByIdAndRemove(id).then((todos) => {
		if(!todos){
			return res.status(404).send("Could not find ID: "+id)
		}
		return res.status(200).send({todos})
	}).catch((e) => {
		res.status(400).send("Error fetching ID")})
})

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	//only allows the user to edit some properties, like text and completed
	var body = _.pick(req.body, ['text', 'completed'])

	if(!ObjectID.isValid(id)){
		return res.status(404).send("ID: "+id+ " is not valid")
	}

	//if the user sends completed, automatically generated completedAt timestamp
	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	//body is an object that is set, sets the rest of the parameteres (text and completed)
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	})
})

app.post('/users', (req, res) => {
	//takes what the user entered and creates a newUser
	var newUser = new User(_.pick(req.body, ['email', 'password']));

	//don't need the promise, only include it if you want to do something after saving it
	newUser.save().then((user) => {
		res.send(user)
	}, (e) => {
		res.status(400).send(e);
	});
});



app.listen(port, () => {
	console.log(`Started on port ${port}`)
})

module.exports = {
	app
}
