class NotesApi {
  async loadNotes(callback, callbackError) {
    await fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        callbackError(error);
      });
  }

  async createNote(note, callbackError) {
    try {
      const createNoteResponse = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: note,
        }),
      });
      return createNoteResponse.json();
    } catch (error) {
      callbackError(error);
      console.log(error);
    }
  }
}

module.exports = NotesApi;
