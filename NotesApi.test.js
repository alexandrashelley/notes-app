const Api = require("./NotesApi");

require("jest-fetch-mock").enableMocks();

describe("the API class", () => {
  it("calls fetch and loads data", () => {
    const api = new Api();

    fetch.mockResponseOnce(
      JSON.stringify({
        content: "This is a note from the Api",
      })
    );

    api.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.content).toBe("This is a note from the Api");
    });
  });

  it("posts a new note to the server and saves it", async () => {
    const api = new Api();
    const note = "This note was successfully saved on the Api";

    fetch.mockResponseOnce(
      JSON.stringify({
        content: note,
      })
    );

    const createdNote = await api.createNote(note);

    console.log(createdNote)
    expect(createdNote.content).toBe("This note was successfully saved on the Api")
  });
});
