//console.log('starting app');

//loads in the  module with require, https://nodejs.org/api/
const fs = require('fs');
const lodash = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');


var command = process.argv[2];
var args = yargs.argv;


var printNote = (note) => {
  console.log('Title:',note.title);
  debugger;
  console.log('Body:',note.body);
};


if (command === 'add'){
  var note = notes.addNote(args.title, args.body);
  if(note == undefined){
    console.log('Note with title',args.title,'already exists');
  }else{
    console.log("Adding note")
    printNote(note)
  }

} else if (command === 'list'){
  var arr = notes.fetchNotes();
  if(arr.length === 0){
    console.log('You do not have any notes yet!')
  }else{
    for (x = 0; x<arr.length; x++){
      printNote(arr[x])
    }

    for(n in arr){
      console.log(n)
      console.log(arr[n])
    }
  }

}else if (command === 'read'){
  var arr = notes.readNote(args.title);
  if (arr.length > 0){
    console.log(typeof(arr[0]));
    printNote(arr[0])
  }else{
    console.log(`could not find note ${args.title}`)
  }

}else if (command === 'remove'){
  var removed = notes.removeNote(args.title)
  var message = removed ? `Node ${args.title} removed` : `Could not find node with title ${args.title}`
  console.log(message)

}else{
  console.log("Command not recognized")
}
