class Library {
  constructor(library = []) {
    this.userLibrary = library;
  }

  addBook(book) {
    this.userLibrary.push(book);
  }
}

export default Library;
