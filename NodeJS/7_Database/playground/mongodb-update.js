//database that stores all the data
//const MongoClient = require('mongodb').MongoClient;
//does the same thing as the line above
const {
	MongoClient,
	ObjectID
} = require('mongodb');

//mongodb uses noSQL, calls each saved item a document and each variable in a document a field
//opens a connection to the database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		console.log('Unable to connect')
		console.log(err);
		return
	}
	console.log("Success!")

	// findOneAndUpdate - updates and returns speficif one (first one)
	var id = new ObjectID("59665bdc7ec5e77340aa234a")
	db.collection('Users').findOneAndUpdate({
		name: "Bill"
	}, {
    $inc: {
      age: 20
    }
	}, {
		returnOriginal: false
	}).then((success) => {
		console.log(JSON.stringify(success, undefined, 2))
	})

	//close connection to databse
	//db.close();
})
