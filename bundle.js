(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
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
        async loadNotes(callback, callbackError) {
          try {
            await fetch("https://notes-server-sigma.vercel.app/notes").then((response) => response.json()).then((data) => {
              callback(data);
            });
          } catch (error) {
            callbackError(error);
          }
        }
        async createNote(note, callbackError) {
          try {
            const createNoteResponse = await fetch("https://notes-server-sigma.vercel.app/notes", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                content: note
              })
            });
            return createNoteResponse.json();
          } catch (error) {
            callbackError(error);
            console.log(error);
          }
        }
      };
      module.exports = NotesApi2;
    }
  });

  // NotesView.js
  var require_NotesView = __commonJS({
    "NotesView.js"(exports, module) {
      var model2 = require_notesModel();
      var api2 = require_NotesApi();
      var NotesView2 = class {
        constructor(model3, api3) {
          this.model = model3;
          this.api = api3;
          this.mainContainerEl = document.querySelector(".flexbox-item-2");
          this.buttonEl = document.querySelector(".add-note-button");
          this.deleteButtonEl = document.querySelector(".delete-note-button");
          this.inputEl = document.querySelector("#note-input");
          this.buttonEl.addEventListener("click", async () => {
            this.clearNotes();
            await this.addNewNote(this.inputEl.value);
            this.inputEl.value = "";
            await this.displayNotesFromApi();
          });
          this.deleteButtonEl.addEventListener("click", () => {
            this.clearNotes();
            this.clearErrorMessage();
          });
        }
        displayNotes(noteData) {
          noteData.forEach((note) => {
            const noteParagraph = document.createElement("p");
            noteParagraph.className = "note-item";
            noteParagraph.textContent = note;
            this.mainContainerEl.append(noteParagraph);
          });
        }
        clearErrorMessage() {
          const elementToRemove = document.querySelectorAll("#error-message");
          elementToRemove.forEach((error) => {
            error.remove();
          });
        }
        clearNotes() {
          const elementToRemove = document.querySelectorAll(".note-item");
          elementToRemove.forEach((note) => {
            note.remove();
          });
        }
        addNewNote(note) {
          return this.api.createNote(note, () => {
            this.displayError();
          });
        }
        async displayNotesFromApi() {
          return this.api.loadNotes(
            (noteData) => {
              this.displayNotes(noteData);
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
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  var NotesModel = require_notesModel();
  var NotesView = require_NotesView();
  var NotesApi = require_NotesApi();
  var model = new NotesModel();
  var api = new NotesApi();
  var view = new NotesView(model, api);
  console.log("The notes app is running");
  view.displayNotesFromApi();
})();
