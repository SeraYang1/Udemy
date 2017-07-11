//database that stores all the data
//const MongoClient = require('mongodb').MongoClient;
//does the same thing as the line above
const {MongoClient, ObjectID} = require('mongodb');

//mongodb uses noSQL, calls each saved item a document and each variable in a document a field
//opens a connection to the database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    console.log('Unable to connect')
    console.log(err);
    return
  }
  console.log("Success!")

  // deleteMany - delete multiple documents, returns nothing if cannot find file
  // db.collection('Todos').deleteMany({text: 'iOS call'}).then((success) => {
  //   console.log(success)
  // })

  // deleteOne - deletes first one that matches criteria
  // db.collection('Todos').deleteOne({text: 'iOS call'}).then((success) => {
  //   console.log(success)
  // })

  // findOneAndDelete - deletes and returns speficif one (first one)
 var id = new ObjectID("59653d5b7ec5e77340aa1cfc")
  db.collection('Todos').findOneAndDelete({_id: id}).then((success) => {
    console.log(JSON.stringify(success,undefined, 2))
  })

  //close connection to databse
  //db.close();
})
