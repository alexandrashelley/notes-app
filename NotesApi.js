class NotesApi {
  async loadNotes(callback, callbackError) {
    try {
      await fetch("https://notes-server-sigma.vercel.app/notes")
        .then((response) => response.json())
        .then((data) => {
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
