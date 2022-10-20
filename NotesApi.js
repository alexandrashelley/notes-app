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

  async createNote(note) {
    const response = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: note,
      }),
    });

    return response.json();
  }
}

module.exports = NotesApi;
