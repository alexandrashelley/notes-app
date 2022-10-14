const NotesModel = require("./notesModel");

describe("Peeps model class", () => {
  it("returns an empty list of peeps", () => {
    const model = new NotesModel();
    expect(model.getNotes()).toEqual([]);
  });

  it("adds a note to the list of notes", () => {
    const model = new NotesModel();
    model.addNote("Buy oat milk");
    model.addNote("Walk the dog");
    expect(model.getNotes()).toEqual(["Buy oat milk", "Walk the dog"]);
  });

  it("clears the list of notes", () => {
    const model = new NotesModel();
    model.addNote("Water the plants");
    model.reset();
    expect(model.getNotes()).toEqual([]);
  });

  it("sets the api notes", () => {
    const model = new NotesModel();
    const apiNotes = ["Test note from the API"]
    model.setNotes(apiNotes);
    expect(model.getNotes()).toEqual(["Test note from the API"])
  })


});
