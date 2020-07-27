/**
 * Provides functions for book property inputs to ensure it has
 * content and to provide formatting or functions like date.
 */
class InputProcessor {
  /**
   * Returns boolean baed on length of given string. The given input is trimmed 
   * to eliminate any white space. It will return true if the length is greater than 0.
   * @param {string} input Book property from HTML input
   */
  hasValue(input) {
    return input.trim().length > 0;
  }

  /**
   * Given a string that only contains numbers it will convert and return the same value as a number type.
   * @param {string} input String to convert to number
   * @returns {number} Converted string as a Number type.
   */
  convertStringToNumber(input) {
    let trimInput = input.trim();
    let containsOnlyNumbers = !/\D/.test(trimInput);

    if (containsOnlyNumbers) {
        trimInput = Number(trimInput)
    } else {
        console.log("incorrect input values in convertToString method.");
        this.snackbar('Only enter numbers');
    }

    return trimInput;
  }

  searchProcess = (form) => {
    // const inputValue = document.getElementById("isbn-input").value;
    const inputValue = '9780394800011';

   if (this.hasValue(inputValue)) {
       if (typeof this.convertStringToNumber(inputValue) === 'number') {
           this.searchBooksApi(form, inputValue);
       }
   } else {
       console.log('searchProcess input is empty');
       this.snackbar('Do not leave search field empty.');
   }
};

/**
 * Takes a number input which it will use to search the Google Books API 
 * and then use the fetch method to return a JSON.
 * @param {number} input number it will use to search the google books API
 */
  searchBooksApi = (form, input) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${input}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data["totalItems"] < 1) {
          this.snackbar("No results found");
        } else {
          document.getElementById("book-entry-cont").style.visibility = "visible";
        //   const form = new FormManipulator();
          form.multiSearchPageRender(data);
        }
      })
      .catch(err => {
        console.log("Error w/ fetch API/Function");
        this.snackbar('API Error');
      });
  };

  /**
   * Given a string parameter it will output that string as a popup/snack bar box on the front end.
   * @param {string} input String to display to user
   */
  snackbar = message => {
    const snackDiv = document.getElementById("snackbar");

    snackDiv.textContent = message;
    snackDiv.className = "show";

    setTimeout(() => {
      snackDiv.className = snackDiv.className.replace("show", "");
    }, 5000);
  };

  authorNameFormatter(author) {
    let firstName = "";
    let lastName = "";

    for (let i = 0; i < author.length; i++) {
      if (author.charAt(i) != " ") {
        firstName += author.charAt(i);
      } else {
        lastName = author.slice(i + 1, author.length) + ", ";
        break;
      }
    }

    return lastName + firstName;
  }

}

/*****************
 *
 * GOOGLE API OBJECT STRUCTURE
 * Object
 * -totalItems(number)
 * -items(array)
 * --Object(books found)
 * ---volumeInfo(array)
 * ----title(string)
 * ----authors(array)
 * -----'the name of names of author(s)'
 * ----publisher(string)
 * ----publishedDate(string)
 * ----pageCount(number)
 * ----imageLinks(Object)
 * -----smallThumbNail(string, 'link to image')
 * -----thumbnail(string, 'link to image')
 *
 *
 */

 /* SAMPLE OUT OF GOOGLE API

 https://www.googleapis.com/books/v1/volumes?q=isbn:9781416938644

 */
