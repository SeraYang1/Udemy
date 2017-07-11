//console.log('starting app');

//loads in the  module with require, https://nodejs.org/api/
const fs = require('fs');
const lodash = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');


var command = process.argv[2];
var titleOptions = {
  describe: 'Title of note',
  //demand - whether the parameter is necessary or not
  demand: true,
  //alias - other things the user can type instead of title
  alias: 't'
}
//edits the input
var args = yargs
    .command('add', 'Add a new note', {
      title: titleOptions,
      body: {
        describe: 'Body of note',
        demand: true,
        alias: 'b'
      }
    })
    .command('read', 'Reads a note', {
      title: titleOptions
    })
    .command('remove', 'Removes a note', {
      title: titleOptions
    })
    .command('list', 'Lists all notes')
    //lists options that user can call
    .help()
    .argv;


var printNote = (note) => {
    console.log('Title:', note.title);
    console.log('Body:', note.body);
};


if (command === 'add') {
    var note = notes.addNote(args.title, args.body);
    if (note == undefined) {
        console.log('Note with title', args.title, 'already exists');
    } else {
        console.log("Adding note")
        printNote(note)
    }

} else if (command === 'list') {
    var arr = notes.fetchNotes();
    if (arr.length === 0) {
        console.log('You do not have any notes yet!')
    } else {
        for (x = 0; x < arr.length; x++) {
            console.log()
            printNote(arr[x])
        }

        //for in statmenets goes through objects properties, ie for array goes through 0...n
        // for (n in arr) {
        //     console.log(n)
        //     console.log(arr[n])
        // }

        //this is what you would expect for in to be like
        // arr.forEach((note) => {
        //     printNote(note)
        // })
    }

} else if (command === 'read') {
    var arr = notes.readNote(args.title);
    if (arr.length > 0) {
        console.log(typeof(arr[0]));
        printNote(arr[0])
    } else {
        console.log(`could not find note ${args.title}`)
    }

} else if (command === 'remove') {
    var removed = notes.removeNote(args.title)
    var message = removed ? `Node ${args.title} removed` : `Could not find node with title ${args.title}`
    console.log(message)

} else {
    console.log("Command not recognized")
}
