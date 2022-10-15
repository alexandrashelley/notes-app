class NotesApi {
  loadNotes(callback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => callback(data));
  }
}

module.exports = NotesApi;



// loadNotes takes a callback function which means we can grab 
// the data from the fetch and do stuff with it in another function
// hence the final .then which turns data into a callback with
// a function
