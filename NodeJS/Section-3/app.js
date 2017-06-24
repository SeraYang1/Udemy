console.log('starting app');

//loads in the  module with require, https://nodejs.org/api/
const fs = require('fs');
const lodash = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');


var command = process.argv[2];
var args = yargs.argv
console.log("process", process.argv)
console.log("yargs", yargs.argv)

if (command === 'add'){
  var note = notes.addNote(args.title, args.body)
  if(note == undefined){
    console.log('Note with that title ',note.title,' already exists');
  }
  else if(note.body == undefined){
    console.log('Note does not contain a body')
  }
  else if(note.title == undefined){
    console.log('Note does not contain a title')
  }
} else if (command === 'list'){
  notes.listNotes()
}else if (command === 'read'){
  notes.readNote(args.title)
}else if (command === 'remove'){
  notes.removeNote(args.title)
}else{
  console.log("Command not recognized")
}
