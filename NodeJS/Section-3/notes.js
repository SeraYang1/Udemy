console.log('starting notes');
const fs = require('fs')
//exports is basically the only useful thing, use other classes variables/functions
var addNote = (title, body) => {
    var notes = [];
    var note = {
        title,
        body
    };
    try {
        var noteString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(noteString)
    } catch (e) {

    }

    var duplicateNotes = notes.filter((n) => {
        return n.title === title;
    });
    
    if (duplicateNotes.length === 0) {
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes))
    }else{
      console.log("You already have a note with that title!")
    }
};
var listNotes = () => {
    console.log("Listing note ")
};
var readNote = (title) => {
    console.log("Reading note ", title)
};
var removeNote = (title) => {
    console.log("Removing note ", title)
};

module.exports = {
    addNote,
    listNotes,
    readNote,
    removeNote
}
