//database that stores all the data
const MongoClient = require('mongodb').MongoClient;

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
  db.collection('Users').insertOne({
    name: 'Sera',
    age: 19,
    location: 'San Jose'
  }, (err, result) => {
    if(err){
      console.log('Unable to add item');
      console.log(err)
      return
    }
    console.log(JSON.stringify(result.ops, undefined, 2))
  })

  //close connection to databse
  db.close();
})
