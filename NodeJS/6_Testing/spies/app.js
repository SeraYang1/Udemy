var db = require('./db.js')

var handleSignup = (email, password) => {
  db.saveUser({
    email: email,
    password: password
  })
}

modeul.exports = {
  handleSignup
}
