const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();

//tells express which file to look at
app.use(express.static(publicPath))

// app.get('/', (req, res) => {
// 	res.render('home.hbs', {
// 		pageTitle: 'Home Page',
// 		welcomeText: "Hello!"
// 	})
// });

//sets up server
app.listen(port, () => {
	console.log(`Server is up on port: ${port}`)
});
