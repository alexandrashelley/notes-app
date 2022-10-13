const NotesModel = require('./NotesModel');
const NotesView = require('./NotesView');
const model = new NotesModel();
const view = new NotesView(model);

console.log('The notes app is running')

model.addNote("I'm viewing this note with the displayNotes function")
view.displayNotes();
view.clearNotes();