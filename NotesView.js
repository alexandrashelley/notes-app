const model = require("./NotesModel");
const api = require("./NotesApi");

class NotesView {
  constructor(model, api) {
    this.model = model;
    this.api = api
    this.mainContainerEl = document.querySelector("#main-container");
    this.buttonEl = document.querySelector("#add-note-button");
    this.inputEl = document.querySelector("#note-input");

    this.buttonEl.addEventListener("click", () => {
      this.clearNotes();
      this.addNewNote();
      this.displayNotes();
      this.inputEl.value = null;
    });
  }

  displayNotes() {
    this.model.getNotes().forEach((note) => {
      const noteParagraph = document.createElement("p");
      noteParagraph.className = "note-item";
      noteParagraph.textContent = note;
      this.mainContainerEl.append(noteParagraph);
    });
  }

  clearNotes() {
    const elementToRemove = document.querySelectorAll(".note-item");
    elementToRemove.forEach((note) => {
      note.remove();
    });
  }

  addNewNote() {
    this.model.addNote(this.inputEl.value);
  }
}

module.exports = NotesView;
