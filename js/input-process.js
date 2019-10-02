/**
 * Provides functions for book property inputs to ensure it has
 * content and to provide formatting or functions like date.
 */
class InputProcessor {
  /**
   * Returns boolean provided argument does not contain only white space.
   * @param {string} input Book property from HTML input
   */
  static hasValue(input) {
    return input.trim().length > 0;
  }

  /**
   * Given a string that only contains numbers it will convert and return the same value as a number type.
   * @param {string} input String to convert to number
   * @returns {number} Converted string as a Number type.
   */
  static convertStringToNumber(input) {
    let trimInput = input.trim();
    let containsOnlyNumbers = !/\D/.test(trimInput);
    containsOnlyNumbers
      ? (trimInput = Number(trimInput))
      : console.log("incorrect input values in convertToString method.");

    return trimInput;
  }

  static authorNameFormatter(author) {
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

  searchBooksApi = input => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${input}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data["totalItems"] < 1) {
          this.snackbar("No results found");
        } else {
          const entryContainer = document.getElementById("book-entry-cont");
          const test = new FormCreator();
          entryContainer.style.visibility = "visible";
          test.searchResultRender(data);
          /*
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
              */
        }
      })
      .catch(err => {
        // Do something for an error here
        console.log("Error w/ fetch API/Function");
      });
  };

  snackbar = message => {
    const snackDiv = document.getElementById("snackbar");

    snackDiv.textContent = message;
    snackDiv.className = "show";

    setTimeout(() => {
      snackDiv.className = snackDiv.className.replace("show", "");
    }, 5000);
  };
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
