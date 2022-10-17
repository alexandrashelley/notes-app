class NotesApi {
  loadNotes(callback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => callback(data));
  }

  createNote(note) {
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: note,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
}

module.exports = NotesApi;
