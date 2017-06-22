// var obj = {
//   name: 'Andrew'
// };
// var stringObj = JSON.stringify(obj);
// console.log(stringObj)
// console.log(typeof stringObj)

// var personString = '{"name": "Sera", "age": "19"}';
// var person = JSON.parse(personString)
// console.log(person)
// console.log(typeof person)

const fs = require('fs');

var originalNote = {
  title: 'Title',
  body: 'Some body'
};
//saves file to json
var originalNoteString = JSON.stringify(originalNote)
fs.writeFileSync('notes.json', originalNoteString);

//reads and reconverts object
var noteString = fs.readFileSync('notes.json')
var note = JSON.parse(noteString)

console.log(typeof note)
console.log(note.title)
