const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
//sets up the port that website would appear on, can be deployed to another website via heroku
const port = process.env.PORT || 3000;
var app = express();

//tells express which file to look at
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs')

//req is the request, res is the response sent back, next is when the function is done executing
app.use((req, res, next) => {
	var log = `${new Date().toString()}: ${req.method} ${req.originalUrl}`
	fs.appendFile('server.log', log + `\n`, (err) => {
		if (err){
			console.log('Unable to append to server.log')
		}
	})
	console.log(log)
	next();
})

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})

//registers helpers or functions
hbs.registerHelper('screamIt', (text) => {
	console.log(text)
	return;
})

//sets up each bage basically, '/' is the home pageTitle
//res.render uses that file to set up the page, passing in parameters
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeText: "Hello!"
	})
});

// app.get('/about', (req, res) => {
// 	res.render('about.hbs', {
// 		pageTitle: 'About Page'
// 	})
// })

//sets up the server on the port
app.listen(port, () => {
	console.log(`Server is up on port: ${port}`)
});
