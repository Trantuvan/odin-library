class Library {
  constructor(library = []) {
    this.userLibrary = library;
  }

  addBook(book) {
    this.userLibrary.push(book);
  }

  removeBook(cardIndex) {
    this.userLibrary.splice(this.userLibrary.indexOf(cardIndex), 1);
  }

  readBook(cardIndex) {
    this.userLibrary[cardIndex].isRead =
      this.userLibrary[cardIndex].isRead === "Read" ? "Not Read" : "Read";
  }
}

export default Library;
