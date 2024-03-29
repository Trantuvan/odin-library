import Book from "./models/book.js";
import Library from "./models/library.js";

(() => {
  const library = new Library();
  const mainGrid = document.querySelector(".main-grid");

  // features per card
  function readBook(cardIndex) {
    if (cardIndex < 0) {
      return;
    }
    library.readBook(cardIndex);
  }

  function removeBook(cardIndex) {
    if (cardIndex < 0) {
      return;
    }
    library.removeBook(cardIndex);
  }

  // render one card per submit
  function renderWhenAddBook(library) {
    const userLibrary = library.userLibrary;
    const lastBookInLibrary = userLibrary[userLibrary.length - 1];
    const lastBookIndex = userLibrary.indexOf(lastBookInLibrary);
    const mainContent = document.querySelector(".main-content");

    mainContent.classList.add("deactivated");
    mainGrid.classList.remove("deactivated");

    mainGrid.innerHTML += `
        <div class="card" data-index="${lastBookIndex}">
            <h2 class="card__title">${lastBookInLibrary.title}</h2>
            <p class="card__author">${lastBookInLibrary.author}</p>
            <p class="card__pages">${lastBookInLibrary.pages} pages</p>
            <div class="card__actions">
              <button class="btn btn-primary">${
                lastBookInLibrary.isRead === "Read" ? "Not Read" : "Read"
              }</button>
              <button class="btn btn-delete">Delete</button>
            </div>
            <p class="card__status">${lastBookInLibrary.isRead}</p>
          </div>
    `;
  }

  // populate book properties
  const addBookFormSubmit = document.querySelector("#add-book-submit");

  addBookFormSubmit.addEventListener("click", (evt) => {
    evt.preventDefault();

    createBookInstance(library);
    renderWhenAddBook(library);
    closeModal();

    if (mainGrid.hasChildNodes()) {
      const cardButtons = document.querySelectorAll(".card button");
      const cardButtonArray = Array.from(cardButtons);

      cardButtonArray.forEach((button) => {
        button.addEventListener("click", (evt) => {
          const card = evt.target.parentNode.parentNode;
          const cardIndex = card.getAttribute("data-index");

          if (evt.target.classList.contains("btn-primary")) {
            readBook(cardIndex);
            const cardStatus = card.querySelector(".card__status");
            cardStatus.innerHTML = `<p class="card__status">${library.userLibrary[cardIndex].isRead}</p>`;

            evt.target.textContent =
              library.userLibrary[cardIndex].isRead === "Read"
                ? "Not Read"
                : "Read";
          }

          if (evt.target.classList.contains("btn-delete")) {
            removeBook(cardIndex);
            mainGrid.removeChild(card);
          }
        });
      });
    }
  });

  function createBookInstance(library) {
    const addBookFormInputs = document.querySelectorAll(".add-book-form input");
    const addBookFormArray = Array.from(addBookFormInputs);

    const bookObj = addBookFormArray.reduce((initValue, input) => {
      if (input.type === "checkbox") {
        return { ...initValue, [input.name]: input.checked };
      }
      return { ...initValue, [input.name]: input.value };
    }, {});

    const book = new Book(
      bookObj.title,
      bookObj.author,
      bookObj.pages,
      bookObj.isRead
    );

    library.addBook(book);
  }

  // Modal
  const addBookbtn = document.querySelector("#add-book-btn");
  const modal = document.querySelector(".modal");
  const modalContainer = document.querySelector(".modal-container");
  const closeModalbtn = document.querySelector(".close__logo");
  const addBookForm = document.querySelector(".add-book-form");

  addBookbtn.addEventListener("click", openModal);

  // close modal when clicked x button
  closeModalbtn.addEventListener("click", closeModal);

  // close modal when clicked outside of modal container
  modal.addEventListener("click", closeModal);

  // stop modal disappear when clicked inside modal container
  modalContainer.addEventListener("click", (evt) => evt.stopPropagation());

  function openModal() {
    if (modal.classList.contains("deactivated")) {
      modal.classList.remove("deactivated");
    }
  }

  function closeModal() {
    if (modal.classList.contains("deactivated") === false) {
      modal.classList.add("deactivated");
    }
    addBookForm.reset();
  }
})();
