const MongoClient = require('mongodb').MongoClient;

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


  db.close();
})
