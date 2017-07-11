//console.log('starting notes');
const fs = require('fs')
//exports is basically the only useful thing, use other classes variables/functions
var fetchNotes = () => {
  try {
      var noteString = fs.readFileSync('notes-data.json');
      return JSON.parse(noteString);
  } catch (e) {
      return [];
  }
};

var saveNote = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((n) => {
        return n.title === title;
    });

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNote(notes)
        return note
    }else{
    }
};


var readNote = (title) => {
    var notes = fetchNotes();
    var filtered = notes.filter((n) => n.title === title)
    return filtered
};


var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredRemove = notes.filter((n) => {
      return n.title !== title;
    });
    saveNote(filteredRemove)
    return filteredRemove.length !== notes.length
};

module.exports = {
    addNote,
    readNote,
    removeNote,
    fetchNotes
}
