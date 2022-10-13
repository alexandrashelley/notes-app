const model = require("./NotesModel");

class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector("#main-container");
  }

  displayNotes() {
    this.model.getNotes().forEach((note) => {
      const noteParagraph = document.createElement("p");
      noteParagraph.className = "note-item";
      noteParagraph.innerText = note
      this.mainContainerEl.append(noteParagraph);
    });
  }
}

module.exports = NotesView;
