(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // NotesModel.js
  var require_NotesModel = __commonJS({
    "NotesModel.js"(exports, module) {
      var NotesModel2 = class {
        constructor() {
          this.notes = [];
        }
        getNotes() {
          return this.notes;
        }
        addNote(note) {
          this.notes.push(note);
        }
        reset() {
          this.notes = [];
        }
      };
      module.exports = NotesModel2;
    }
  });

  // NotesView.js
  var require_NotesView = __commonJS({
    "NotesView.js"(exports, module) {
      var model2 = require_NotesModel();
      var NotesView2 = class {
        constructor(model3) {
          this.model = model3;
          this.mainContainerEl = document.querySelector("#main-container");
          this.buttonEl = document.querySelector("#add-note-button");
          this.inputEl = document.querySelector("#note-input");
          this.buttonEl.addEventListener("click", () => {
            this.addNewNote();
            this.displayNotes();
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
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  var NotesModel = require_NotesModel();
  var NotesView = require_NotesView();
  var model = new NotesModel();
  var view = new NotesView(model);
  console.log("The notes app is running");
  model.addNote("I'm viewing this note with the displayNotes function");
  view.displayNotes();
})();
