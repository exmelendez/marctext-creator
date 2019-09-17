let book1 = new EntryBook("cat in hat", "dr. seuss", "english", "Picture Book", 2007, 56473837);
let book2 = new EntryBook("rainbow wigs", "Kathy Weis", "english", "Poetry", 1999, 12345678);
let book3 = new EntryBook("Frijoles", "Pablito Diaz", "spanish", "Non-Fiction", 2010, 303876373);
let entries = new BookEntries();
entries.addEntry(book1);
entries.addEntry(book2);
entries.addEntry(book3);

const ifConnected = window.navigator.onLine;
if (!ifConnected) {
  document.getElementById("manual-inp").style.display = "block";
}

const searchInput = document.getElementById("isbn-input");
const searchSubmitBtn = document.getElementById("search-submit");
const statusP = document.getElementById("status-msg");
const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");
const modTitleInputEdit = document.getElementById("mod-edit-bk-title");

searchSubmitBtn.addEventListener("click", () => {
  modalBg.classList.add("bg-active");
  let inputValue = searchInput.value;

  if (inputValue) {
    searchBooksApi(inputValue);
  } else {
    statusP.innerHTML = "Enter valid number in field";
  }

  searchInput.value = "";
});

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
