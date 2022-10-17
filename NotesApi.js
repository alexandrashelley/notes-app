class NotesApi {
  loadNotes(callback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => callback(data));
  }

  async createNote(note) {
    console.log(fetch);
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
