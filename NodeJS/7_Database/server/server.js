var express = require('express')
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/users')

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
    res.send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000')
})
