const Api = require("./NotesApi");

require("jest-fetch-mock").enableMocks();

describe("the API class", () => {
  it("calls fetch and loads data", () => {
    const api = new Api();

    fetch.mockResponseOnce(
      JSON.stringify({
        name: "This is a note from the Api",
      })
    );

    api.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.name).toBe("This is a note from the Api");
    });
  });

  it("posts a new note to the server and saves it", () => {
    const api = new Api();
    const note = "This note was successfully saved on the Api";

    fetch.mockResponseOnce(
      JSON.stringify({
        content: note,
      })
    );

    api.createNote(note);

    fetch.mockResponseOnce();
  });
});
