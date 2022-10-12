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
});

// model.getNotes(); // should return []

// model.addNote('Buy milk');
// model.addNote('Go to the gym');

// model.getNotes(); // should now return ['Buy milk', 'Go to the gym']

// model.reset();

// model.getNotes(); // should now return []
