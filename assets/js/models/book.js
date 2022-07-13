class Book {
  constructor(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead === false ? "not read" : "read";
  }
}

export default Book;
