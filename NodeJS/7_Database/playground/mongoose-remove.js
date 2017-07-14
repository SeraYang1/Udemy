const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/users')


Todo.findByIdAndRemove("59671a67bdfcd8a855fd8625").then((todo) => {
  console.log(JSON.stringify(todo, undefined, 2))
})
