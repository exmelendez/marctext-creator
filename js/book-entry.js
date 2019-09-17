class BookEntry {
  constructor(type) {
    this.entry = {
      entryType: type
    };
  }

  /* Takes book info object and saves to Data property in entry object. 
    Also initializes a count function that counts all the passed properties */
  addBookInfo(bookData) {
    this.entry.data = bookData;
    this.entry.propCount = null;

    this.setPropCount(bookData);
  }

  /* Takes passed object and counts the properties that have an initialized 
    value then saves the value to a property of entry titled "propCount". At this 
    moment if a property has one or more blank spaces it will increase the count */
  setPropCount(bookData) {
    let propNumCount = 0;

    for (let key in bookData) {
      if (bookData[key]) {
        propNumCount++;
      }
    }

    this.entry.propCount = propNumCount;
  }

  /* returns entire "entry" object */
  getEntryData() {
    return this.entry;
  }

  /* returns object for book data entered */
  getBookInfo() {
    return this.entry.data;
  }

  /* returns boolean after verifying that propCount property in entry object is greater than 5. This will be used to ensure we have the minimum required information to create a marc record. A minimum of 6 fields are required to create a marc record.*/
  isEntryValid() {
    return this.entry.propCount > 5;
  }
}

class Book {
  constructor(title, author, language, holding, pubYear, barcode) {
    this._title = title;
    this._author = author;
    this._language = language;
    this._holding = holding;
    this._pubYear = pubYear;
    this._barcode = barcode;
  }
}
