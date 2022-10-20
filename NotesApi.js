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
    const response = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: note,
      }),
    })
    // .catch((error) => {
    //   callbackError(error);
    //   console.log(error);
    // });
    return response.json();
  }
}

module.exports = NotesApi;
