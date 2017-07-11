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

  //find().toArray() takes all the documents in the collection and returns them as a promise
  //find({attibute: 'value'}) filters and returns items that match that filter
  db.collection('Users').find({location: 'San Jose'}).toArray().then((docs) => {
    console.log('Users count: ',docs.length);
    console.log(JSON.stringify(docs, undefined, 2))
  }, (err) => {
    console.log('Unable to fetch users', err)
  })

console.log(db.collection('Users').find())
  //close connection to databse
  db.close();
})
