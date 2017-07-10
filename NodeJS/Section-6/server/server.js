const express = require('express')

var app = express()

app.get('/', (req, res) => {
	res.send('Hello World')
});

app.get('/users', (req, res) => {
	res.send([{
			name: 'Sera',
			age: 19
		},
		{
			name: "hello",
			age: 20
		},
		{
			name: 'hi',
			age: 5
		}
	])
});


app.listen(3000);
module.exports = {
	app
}
