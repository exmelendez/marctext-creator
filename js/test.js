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
  entryContainer.style.visibility = "visible";
});

manEntryCancelBtn.addEventListener("click", () => {
  entryContainer.style.visibility = "hidden";
  snackbar("entry cancelled");
});

const searchInput = document.getElementById("isbn-input");
const searchSubmitBtn = document.getElementById("search-submit");
const statusP = document.getElementById("status-msg");
const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");
const modTitleInputEdit = document.getElementById("mod-edit-bk-title");

searchSubmitBtn.addEventListener("click", () => {
  !ifConnected ? snackbar("not connected to internet") : searchProcess();
});

const searchProcess = () => {
  let inputValue = searchInput.value;

  if (inputValue) {
    modalBg.classList.add("bg-active");
    searchBooksApi(inputValue);
  } else {
    snackbar("enter valid value");
  }

  searchInput.value = "";
};

const searchBooksApi = input => {
  fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + input)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data["totalItems"] < 1) {
        statusP.innerHTML = "No results found.";
      } else {
        statusP.innerHTML = `Found: ${data["items"][0]["volumeInfo"]["title"]}`;

        console.log(input);
        console.log(data["items"][0]["volumeInfo"]["title"]);
        // console.log(data['items'][0]['volumeInfo']['authors'][0]);
        console.log(
          authorNameFormatter(data["items"][0]["volumeInfo"]["authors"][0])
        );
        console.log(data["items"][0]["volumeInfo"]["pageCount"]);
        console.log(data["items"][0]["volumeInfo"]["publisher"]);
        console.log(
          data["items"][0]["volumeInfo"]["publishedDate"].slice(0, 4)
        );
        console.log(data["items"][0]["volumeInfo"]["description"]);
      }
    })
    .catch(err => {
      // Do something for an error here
      console.log("Error w/ fetch API/Function");
    });
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

// const modalBtn = document.querySelector(".modal-btn");

/*
modalBtn.addEventListener("click", () => {
  modalBg.classList.add("bg-active");
});
*/

modalClose.addEventListener("click", () => {
  modalBg.classList.remove("bg-active");
});

modTitleInputEdit.addEventListener("click", () => {
  const modTitleInput = document.getElementById("mod-book-title");
  modTitleInput.removeAttribute("disabled");
  modTitleInput.style.color = "green";
  modTitleInputEdit.style.color = "green";
  modTitleInputEdit.style.cursor = "default";
});

const newObj = new FormCreator();
// const newElem = newObj.elementCreator2();
