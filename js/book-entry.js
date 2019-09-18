/**
 * Takes in the required properties to create a book object regardless of manual entry or API
 */
class Book {

    /**
     * 
     * @param {string} title Title of book
     * @param {string} author Author of book
     * @param {string} language Language of book
     * @param {string} holding Genre of book
     * @param {number} pubYear Year the book was published
     * @param {number} barcode The unique id of the book
     */
    constructor(title, author, language, holding, pubYear, barcode) {
        this._author = author;
        this._barcode = barcode;
        this._holding = holding;
        this._language = language;
        this._pubYear = pubYear;
        this._title = title;
    }

    /* GETTERS */

    /**
     * Returns author of book
     * @return {string} returns author of the book
     */
    get author() {
        return this._author;
    }

    /**
     * Returns unique barcode/number of book set by SBCS
     * @returns {number} returns unique ID of book
     */
    get barcode() {
        return this._barcode;
    }

    /**
     * Returns all book data as an object
     * @returns {object} returns all book data as an object
     */
    get bookData() {
        return {
            author : this._author,
            barcode : this._barcode,
            holding : this._holding,
            language : this._language,
            pubYear : this._pubYear,
            title : this._title
        };
    }

    /**
     * Returns genre of book
     * @returns {string} Returns genre of book
     */
    get holding() {
        return this._holding;
    }

    /**
     * Returns language of book
     * @returns {string} Returns language of book
     */
    get language() {
        return this._language;
    }

    /**
     * Returns the year the book was published
     * @returns {number} Year the book was published
     */
    get pubYear() {
        return this._pubYear;
    }

    /**
     * Returns the title of the book
     * @returns {string} Title of book
     */
    get title() {
        return this._title;
    }

    /* SETTERS */

    /**
     * Sets or modifies string name of author
     * @param {string} newAuthor Name of author
     */
    set author(newAuthor) {
        this._author = newAuthor;
    }

    /**
     * Sets or modifies unique id number of book
     * @param {number} newBarcode Unique ID of book
     */
    set barcode(newBarcode) {
        this._barcode = newBarcode;
    }

    /**
     * Sets or modifies genre of book
     * @param {string} newHolding Genre of book
     */
    set holding(newHolding) {
        this._holding = newHolding;
    }

    /**
     * Sets or modifies language of book
     * @param {string} newLanguage Language of book
     */
    set language(newLanguage) {
        this._language = newLanguage;
    }

    /**
     * Sets or modifies published year of book
     * @param {number} newPubYear Year book published
     */
    set pubYear(newPubYear) {
        this._pubYear = newPubYear;
    }

    /**
     * Sets or modifies title of book
     * @param {string} newTitle Title of book
     */
    set title(newTitle) {
        this._title = newTitle;
    }

}

/**
 * Class to include extra book data that may be given manually or through the Google API
 */
class EntryBook extends Book {
     
    /**
     * 
     * @param {string} title Title of book
     * @param {string} author Author of book
     * @param {string} language Language of book
     * @param {string} holding Genre of book
     * @param {number} pubYear Year the book was published
     * @param {number} barcode The unique id of the book
     */
    constructor(title, author, language, holding, pubYear, barcode) {
        super(title, author, language, holding, pubYear, barcode);
     }

     /**
      * Called when using the Google API to set variables with the extra given data
      * @param {number} isbn Book identifying number typically set by publisher. Should be between 10-13 digits.
      * @param {string} publisher Name of book publisher
      * @param {number} totalPages Total number of pages in book
      */
     apiInputEntries(isbn, publisher, totalPages) {
        this.isbn = isbn;
        this.publisher = publisher;
        this.totalPages = totalPages;
     }

     /**
      * Will set property variables to those properties enterted manually or through the API form
      * @param {object} bookProperties Object of properties to set and their values
      */
     extraInputEntry(bookProperties) {
        for (let key in bookProperties) {

            switch (key) {
                case 'isbn':
                    this.isbn = bookProperties[key];
                    break;

                case 'publisher':
                    this.publisher = bookProperties[key];
                    break;
            
                case 'totalPages':
                    this.totalPages = bookProperties[key];
                    break;

                case 'upc':
                    this.upc = bookProperties[key];
                    break;

                case 'pubLocation':
                    this.pubLocation = bookProperties[key];
                    break;
            
                case 'price':
                    this.price = bookProperties[key];
                    break;

                default:
                    console.log(`switch error in extraInputEntry`);
                    break;
            }
        }
     }

     /* GETTERS */

     /**
      * Returns isbn, which is the book identifying number given by the publisher, as a number
      * @returns {number} Identification number set by the publisher
      */
     get isbn() {
         return this._isbn;
     }

     /**
      * Returns the cost of the book as a number
      * @returns {number} Price of book
      */
     get price() {
        return this._price;
     }

     /**
      * Returns the publishers name as a string
      * @returns {string} Publisher of book
      */
     get publisher() {
        return this._publisher;
     }

     /**
      * Returns the books published location as a string
      * @returns {string} Published location of book
      */
     get pubLocation() {
        return this._pubLocation;
     }

     /**
      * Returns the total number of pages in the book as a number.
      * @returns {number} Total number of pages in book
      */
     get totalPages() {
        return this._totalPages;
     }

     /**
      * Returns the number of the barcode provided by the publisher.
      * @returns {number} Number provided as barcode by publisher
      */
     get upc() {
        return this._upc;
     }

    /* SETTERS */

    /**
     * Set ISBN
     * @param {number} isbn Identifying number provided by the publisher
     */
    set isbn(isbn) {
        this._isbn = isbn;
     }

    /**
     * Set cost of book
     * @param {number} price Price of book
     */
    set price(price) {
        this._price = price;
    }

    /**
     * Set the name of the publisher
     * @param {string} publisher Name of book publisher
     */
    set publisher(publisher) {
        this._publisher = publisher;
    }

    /**
     * Set published location of book
     * @param {string} pubLocation Published location of book
     */
    set pubLocation(pubLocation) {
        this._pubLocation = pubLocation;
    }

    /**
     * Set the total number of pages in book
     * @param {number} totalPages Total number of pages in book
     */
    set totalPages(totalPages) {
        this._totalPages = totalPages;
    }

    /**
     * Set UPC code set by publisher
     * @param {number} upc Barcode number of book given by publisher
     */
    set upc(upc) {
         this._upc = upc;
    }
    
}
