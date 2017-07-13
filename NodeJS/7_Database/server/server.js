var express = require('express')
var bodyParser = require('body-parser')
var {ObjectID} = require('mongodb')

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
	Todo.find().then((success) => {
		res.send({
			success
		})
    //console.log(JSON.stringify(success, undefined, 2))
	}, (fail) => res.status(400).send(fail))
})

//:id allows us to fetch what was entered in as params
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send("ID: "+id+ " is not valid")
	}

	Todo.findById(id).then((success) => {
		if(!success){
			return res.status(404).send("Could not find ID: "+id)
		}
		return res.status(200).send(success)
	}).catch((e) => res.status(400).send("Error fetching ID"))
})


app.listen(port, () => {
	console.log(`Started on port ${port}`)
})

module.exports = {
	app
}
