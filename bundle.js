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
        setNotes(apiNotes) {
          this.notes = apiNotes;
        }
      };
      module.exports = NotesModel2;
    }
  });

  // NotesApi.js
  var require_NotesApi = __commonJS({
    "NotesApi.js"(exports, module) {
      var NotesApi2 = class {
        loadNotes(callback) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => callback(data));
        }
        async createNote(note) {
          console.log(fetch);
          const response = await fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              content: note
            })
          });
          return response.json();
        }
      };
      module.exports = NotesApi2;
    }
  });

  // NotesView.js
  var require_NotesView = __commonJS({
    "NotesView.js"(exports, module) {
      var model2 = require_NotesModel();
      var api2 = require_NotesApi();
      var NotesView2 = class {
        constructor(model3, api3) {
          this.model = model3;
          this.api = api3;
          this.mainContainerEl = document.querySelector("#main-container");
          this.buttonEl = document.querySelector("#add-note-button");
          this.inputEl = document.querySelector("#note-input");
          this.buttonEl.addEventListener("click", () => {
            this.addNewNote(this.inputEl.value);
            this.inputEl.value = "";
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
        addNewNote(note) {
          this.model.addNote(note);
          this.api.createNote(note);
        }
        displayNotesFromApi() {
          this.api.loadNotes((noteData) => {
            this.model.setNotes(noteData);
            this.displayNotes();
          });
        }
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  var NotesModel = require_NotesModel();
  var NotesView = require_NotesView();
  var NotesApi = require_NotesApi();
  var model = new NotesModel();
  var api = new NotesApi();
  var view = new NotesView(model, api);
  console.log("The notes app is running");
  view.displayNotesFromApi();
})();
