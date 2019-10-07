//TODO: Ensure successful creation of manual/modal inputs/forms

// const formCreator = new FormManipulator();
// formCreator.createForm();

let book1 = new EntryBook(
  "cat in hat",
  "dr. seuss",
  "english",
  "Picture Book",
  2007,
  56473837
);
let book2 = new EntryBook(
  "rainbow wigs",
  "Kathy Weis",
  "english",
  "Poetry",
  1999,
  12345678
);
let book3 = new EntryBook(
  "Frijoles",
  "Pablito Diaz",
  "spanish",
  "Non-Fiction",
  2010,
  303876373
);
let enteredBooks = new BookEntries();
enteredBooks.addEntry(book1);
enteredBooks.addEntry(book2);
enteredBooks.addEntry(book3);

const ifConnected = window.navigator.onLine;

const manEntryAddBtn = document.getElementById("add-man-ent-btn");
const manEntryCancelBtn = document.getElementById("cancel-man-ent-btn");
const entryContainer = document.getElementById("book-entry-cont");
const formManipulator = new FormManipulator();

const searchSubmitBtn = document.getElementById("search-submit");
const statusP = document.getElementById("status-msg");

/**
 * Click Event Listener for manual form entry button.
 * This will make the manual entry form visible.
 */
manEntryAddBtn.addEventListener("click", () => {
  formManipulator.manualEntryRender();
  entryContainer.style.visibility = "visible";
});

/**
 * Click Event Listener for manual entry form cancel button.
 * This will reset the manual form and make it hidden.
 */
manEntryCancelBtn.addEventListener("click", formManipulator.removeResetForm);

/**
 * Click Event Listener for ISBN Search Btn
 */
searchSubmitBtn.addEventListener("click", () => {
  formManipulator.remove();
  const inputProcessor = new InputProcessor();
  inputProcessor.searchProcess(formManipulator);
});

document
  .querySelectorAll("#page-picker>span")[0]
  .addEventListener("click", () => {
    formManipulator.searchPageArrowRender("left");
  });

document
  .querySelectorAll("#page-picker>span")[2]
  .addEventListener("click", () => {
    formManipulator.searchPageArrowRender("right");
  });
