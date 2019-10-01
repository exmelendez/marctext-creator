//TODO: Create HTML elements that can be dynamically created/used in manual entry and in search modal
//TODO: Figure out where to place google API/info
//TODO: Ensure successful creation of manual/modal inputs/forms

// const formCreator = new FormCreator();
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

// function for SNACKBAR
const snackbar = message => {
  const snackDiv = document.getElementById("snackbar");

  snackDiv.textContent = message;
  snackDiv.className = "show";

  setTimeout(() => {
    snackDiv.className = snackDiv.className.replace("show", "");
  }, 5000);
};

/* BUTTONS/LISTENERS TO HAVE MANUAL ENTRY INPUT APPEAR */
const manEntryAddBtn = document.getElementById("add-man-ent-btn");
const manEntryCancelBtn = document.getElementById("cancel-man-ent-btn");
const entryContainer = document.getElementById("book-entry-cont");

manEntryAddBtn.addEventListener("click", () => {
    const formFormatter = new FormCreator();
    formFormatter.manualEntryRender();
    entryContainer.style.visibility = "visible";
});

manEntryCancelBtn.addEventListener("click", () => {
  entryContainer.style.visibility = "hidden";
  snackbar("entry cancelled");
});

const searchInput = document.getElementById("isbn-input");
const searchSubmitBtn = document.getElementById("search-submit");
const statusP = document.getElementById("status-msg");

searchSubmitBtn.addEventListener("click", () => {
  !ifConnected ? snackbar("not connected to internet") : searchProcess();
});

const searchProcess = () => {
    let inputValue = searchInput.value;
    // const formFormatter = new FormCreator();
    const INPUT_PROCESS = new InputProcessor();

  if (inputValue) {
    INPUT_PROCESS.searchBooksApi(inputValue);
    searchInput.value = "";
    
  } else {
    snackbar("enter valid value");
  }

};

const authorNameFormatter = name => {
  let firstName = "";
  let lastName = "";

  for (let i = 0; i < name.length; i++) {
    if (name.charAt(i) != " ") {
      firstName += name.charAt(i);
    } else {
      lastName = name.slice(i + 1, name.length) + ", ";
      break;
    }
  }

  return lastName + firstName;
};
