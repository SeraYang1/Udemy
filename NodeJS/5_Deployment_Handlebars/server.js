const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs')

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

hbs.registerHelper('fetchWeather', (text) => {
	console.log(text)
	return;
})


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

app.listen(port, () => {
	console.log(`Server is up on port: ${port}`)
});
