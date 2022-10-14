/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesModel = require("./NotesModel");
const NotesApi = require("./NotesApi");
const NotesView = require("./NotesView");

describe("the notes view page", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("displays a note on the page", () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote("This is a test note");
    view.displayNotes();

    expect(document.querySelectorAll(".note-item").length).toBe(1);
  });

  it("clears the list of notes from the page", () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote("This is a note to be cleared");
    view.clearNotes();

    expect(document.querySelectorAll(".note-item").length).toBe(0);
  });

  it("clicking the button adds a new note", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const inputEl = document.querySelector("#note-input");
    inputEl.value = "This note was added with a button click";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();

    expect(document.querySelectorAll(".note-item").length).toBe(1);
    expect(document.querySelector(".note-item")).not.toBeNull();
    expect(document.querySelector(".note-item").textContent).toBe(
      "This note was added with a button click"
    );
  });

  it("clicking the button only displays newly added note", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    model.addNote("An older note");

    const inputEl = document.querySelector("#note-input");
    inputEl.value = "No duplicate notes to be shown please";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();

    expect(document.querySelectorAll(".note-item").length).toBe(2);
    expect(document.querySelector(".note-item")).not.toBeNull();
    expect(document.querySelectorAll(".note-item")[0].textContent).toBe(
      "An older note"
    );
    expect(document.querySelectorAll(".note-item")[1].textContent).toBe(
      "No duplicate notes to be shown please"
    );
  });

  it("clears input after clicking button", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Clear the input field please";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();

    expect(inputEl.value).toBe("");
  });

  xit("displays notes from the API", () => {
    const model = new NotesModel();
    const api = new NotesApi();
    const view = new NotesView(model, api);

    fetch.mockResponseOnce(JSON.stringify({
      name: "This is a note from the API",
      id: 123
    }));

    api.loadNotes();
    model.setNotes(notes);
    view.displayNotes();


  });
});
