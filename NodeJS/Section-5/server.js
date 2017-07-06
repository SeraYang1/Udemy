const express = require('express')
const hbs = require('hbs')
var app = express();

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  // res.send({
  //   name: 'Sera Yang',
  //   hobbies: [
  //     'Longboarding',
  //     'Traveling'
  //   ]
  // });
  res.render('home.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
    welcomeText: "Hello!"
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error!!!'
  })
})

app.listen(3000, () => {
  console.log("Running port")
});
