const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/users')

var id = "5967c3467ec5e77340aa3070"

//Checks if the id entered is valid
if(!ObjectID.isValid(id)){
  return console.log("ID not valid")
}
//all basically the same as mongodb
//find lists all queries when not given a parameter
//find filters by parameter if there is one
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("Todos: ", todos)
// })
//
// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('ID not found')
//   }
//   console.log('Todo by ID', todo)
// })

User.findById(id).then((user) => {
  if(!user){
    return console.log("User not found")
  }
  console.log(JSON.stringify(user, undefined, 2))
}, (error) => console.log(error))
