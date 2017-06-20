console.log('starting app');

//loads in the  module with require, https://nodejs.org/api/
const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

var notesString = notes.add("a", 1);
console.log(notesString);

// var user = os.userInfo();
//
// //can call other classes variables/functions through module.exports
// fs.appendFileSync('greeting.txt', `Hello ${user.username}! You are ${notes.age}.`)
