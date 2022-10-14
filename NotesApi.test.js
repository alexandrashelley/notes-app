const Api = require('./NotesApi');

require('jest-fetch-mock').enableMocks()

describe('the API class', () => {
  it('calls fetch and loads data', () => {
    const api = new Api();

    fetch.mockResponseOnce(JSON.stringify({
      name: "This is a note from the API",
      id: 123
    }));

    api.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.name).toBe("This is a note from the API");
      expect(returnedDataFromApi.id).toBe(123);
    });
  });
});