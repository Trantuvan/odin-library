class Book {
  constructor(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead === false ? "Not Read" : "Read";
  }
}

export default Book;
