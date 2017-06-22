console.log('starting notes');

//exports is basically the only useful thing, use other classes variables/functions
var addNote = (title, body) => {
  console.log("adding note ", title, body)
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
