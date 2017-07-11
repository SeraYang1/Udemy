//database that stores all the data
//const MongoClient = require('mongodb').MongoClient;
//does the same thing as the line above
const {MongoClient} = require('mongodb');

//mongodb uses noSQL, calls each saved item a document and each variable in a document a field
//opens a connection to the database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    console.log('Unable to connect')
    console.log(err);
    return
  }
  console.log("Success!")

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err){
  //     console.log('Unable to add item.')
  //     console.log(err)
  //     return
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // })

  //collection is the name of the table, insertOne saves a document into it
  // db.collection('Users').insertOne({
  //   name: 'Jennifer',
  //   age: 19,
  //   location: 'Cupertino'
  // }, (err, result) => {
  //   if(err){
  //     console.log('Unable to add item');
  //     console.log(err)
  //     return
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  //   //unique id that mongodb generates contains a timestamp that can be retrieved
  //   console.log(result.ops[0]._id.getTimestamp())
  // })

  //close connection to databse
  db.close();
})
