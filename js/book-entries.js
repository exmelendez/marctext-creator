/**
 * Inserts, removes and modifies Book, object entries in an array.
 */
class BookEntries {
  entries = [];

  /** 
   * Inserts a book object into class array variable
   * @param {object} book The book object passed
  */
  addEntry(book) {
    this.entries.push(book);
  }

  /**
   * Removes element from object array based off number argument given
   * @param {number} index - number index to remove
   */
  removeEntry(index) {
    this.entries.splice(index, 1);
  }

  /**
   * Modifies element from array based off arguments given
   * 
   * @param {number} index element in array to modify
   * @param {string} propName property of name to modify as string
   * @param {string} propVal new value
   */
  editEntry(index, propName, propVal) {

    switch (propName) {
      case "author":
        this.entries[index].author = propVal;
        break;

      case "barcode":
        this.entries[index].barcode = propVal;
        break;

      case "holding":
          this.entries[index].holding = propVal;
          break;

      case "isbn":
          this.entries[index].isbn = propVal;
          break;

      case "language":
        this.entries[index].language = propVal;
        break;

      case "price":
        this.entries[index].price = propVal;
        break;

      case "publisher":
        this.entries[index].publisher = propVal;
        break;

      case "pubLocation":
        this.entries[index].pubLocation = propVal;
        break;

      case "pubYear":
        this.entries[index].pubYear = propVal;
        break;

      case "title":
        this.entries[index].title = propVal;
        break;

      case "totalPages":
        this.entries[index].totalPages = propVal;
        break;

      case "upc":
        this.entries[index].upc = propVal;
        break;

      default:
        console.log('error with switch in editEntry()');
        break;
    }

  }

  /**
   * Returns the length of the object array variable
   * @returns {number} length of object array
   */
  get total() {
    return this.entries.length;
  }

  /**
   * Returns the object array
   * @return {array} array of book objects
   */
  get allEntries() {
    return this.entries;
  }
}
