import Book from "./models/book.js";
import Library from "./models/library.js";

// Modal
const addBookbtn = document.querySelector("#add-book-btn");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-container");
const closeModalbtn = document.querySelector(".close__logo");

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
}
