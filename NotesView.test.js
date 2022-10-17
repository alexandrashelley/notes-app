/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesModel = require("./NotesModel");
const NotesApi = require("./NotesApi");
const NotesView = require("./NotesView");

require("jest-fetch-mock").enableMocks();

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

  it("clicking the delete button clears the list of notes from the page", () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const inputEl = document.querySelector("#note-input");
    inputEl.value = "I'm going to delete this note";

    const buttonEl = document.querySelector("#delete-note-button");
    buttonEl.click();

    expect(document.querySelectorAll(".note-item").length).toBe(0);
  });

  it("clicking the button adds a new note", () => {
    const model = new NotesModel();

    const mockApi = {
      createNote: () => {
        return { content: "This note was saved" };
      },
      loadNotes: (callback) => {
        callback(["This note was saved"]);
      },
    };

    const view = new NotesView(model, mockApi);

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

    const mockApi = {
      createNote: () => {
        return { content: "This note was saved" };
      },
      loadNotes: (callback) => {
        callback(["This note was saved"]);
      },
    };

    const view = new NotesView(model, mockApi);

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

    const mockApi = {
      createNote: () => {
        return { content: "This note was saved" };
      },
      loadNotes: (callback) => {
        callback(["This note was saved"]);
      },
    };

    const view = new NotesView(model, mockApi);

    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Clear the input field please";

    const buttonEl = document.querySelector("#add-note-button");
    buttonEl.click();

    expect(inputEl.value).toBe("");
  });

  it("displays notes from the API", () => {
    const model = new NotesModel();

    const mockApi = {
      loadNotes: (callback) =>
        callback(["This is a test note", "This is another test note"]),
    };

    const view = new NotesView(model, mockApi);

    view.displayNotesFromApi();

    expect(document.querySelectorAll(".note-item").length).toEqual(2);
    expect(document.querySelectorAll(".note-item")[0].textContent).toEqual(
      "This is a test note"
    );
    expect(document.querySelectorAll(".note-item")[1].textContent).toEqual(
      "This is another test note"
    );
  });

  it("displays notes that have been posted to the Api", () => {
    const model = new NotesModel();

    const mockApi = {
      createNote: jest.fn(),
      loadNotes: (callback) => {
        callback(["This note was already in the server"]);
      },
    };

    const view = new NotesView(model, mockApi);
    const inputEl = document.querySelector("#note-input");
    const buttonEl = document.querySelector("#add-note-button");
    inputEl.value = "This note was posted";
    buttonEl.click();
    expect(mockApi.createNote).toHaveBeenCalledWith("This note was posted");

    view.displayNotesFromApi();

    expect(document.querySelectorAll(".note-item").length).toEqual(2);
    expect(document.querySelectorAll(".note-item")[0].textContent).toEqual(
      "This note was posted"
    );
    expect(document.querySelectorAll(".note-item")[1].textContent).toEqual(
      "This note was already in the server"
    );
  });
});
