const model = require("./NotesModel");
const api = require("./NotesApi");

class NotesView {
  constructor(model, api) {
    this.model = model;
    this.api = api;
    this.mainContainerEl = document.querySelector("#main-container");
    this.buttonEl = document.querySelector("#add-note-button");
    this.deleteButtonEl = document.querySelector("#delete-note-button");
    this.inputEl = document.querySelector("#note-input");

    this.buttonEl.addEventListener("click", () => {
      this.clearNotes();
      this.addNewNote(this.inputEl.value);
      this.inputEl.value = "";
      this.displayNotes();
    });

    this.deleteButtonEl.addEventListener("click", () => {
      this.clearNotes();
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

  addNewNote(note) {
    this.model.addNote(note);
    return this.api.createNote(note, () => {
      this.displayError();
    });
  }

  displayNotesFromApi() {
    return this.api.loadNotes(
      (noteData) => {
        this.model.setNotes(noteData);
        this.displayNotes();
      },
      () => {
        this.displayError();
      }
    );
  }

  displayError() {
    const errorMessage = document.createElement("p");
    errorMessage.id = "error-message";
    errorMessage.textContent = "Oops! Something went wrong";
    this.mainContainerEl.append(errorMessage);
  }
}

module.exports = NotesView;
