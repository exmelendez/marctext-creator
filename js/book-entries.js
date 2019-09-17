class BookEntries {
  entries = [];

  /* takes a book object and inserts it into the object array */
  addEntry(book) {
    this.entries.push(book)
  }

  /* removes an element from the object array based off the 
  parameter given which is the number of the index to be removed. */
  removeEntry(index) {
    this.entries.splice(index, 1);
  }

  /* returns the length of the object entry array */
  get total() {
    return this.entries.length;
  }

  /* returns object array with all elements */
  get allEntries() {
    return this.entries;
  }
}
