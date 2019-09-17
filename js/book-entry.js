class Book {
    constructor(title, author, language, holding, pubYear, barcode) {
        this._title = title;
        this._author = author;
        this._language = language;
        this._holding = holding;
        this._pubYear = pubYear;
        this._barcode = barcode;
    }

    /* GETTERS */
    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get language() {
        return this._language;
    }

    get holding() {
        return this._holding;
    }

    get pubYear() {
        return this._pubYear;
    }

    get barcode() {
        return this._barcode;
    }
    get bookData() {
        return {
            title : this._title,
            author : this._author,
            language : this._language,
            holding : this._holding,
            pubYear : this._pubYear,
            barcode : this._barcode
        };
    }

    /* SETTERS */
    set title(newTitle) {
        this._title = newTitle;
    }

    set author(newAuthor) {
        this._author = newAuthor;
    }

    set language(newLanguage) {
        this._language = newLanguage;
    }

    set holding(newHolding) {
        this._holding = newHolding;
    }

    set pubYear(newPubYear) {
        this._pubYear = newPubYear;
    }

    set barcode(newBarcode) {
        this._barcode = newBarcode;
    }

}

class EntryBook extends Book {
     
    constructor(title, author, language, holding, pubYear, barcode) {
        super(title, author, language, holding, pubYear, barcode);
     }

     /* takes in 3 book properties can calls their appropiate setter function  */
     apiInputEntries(isbn, publisher, totalPages) {
        this.isbn = isbn;
        this.publisher = publisher;
        this.totalPages = totalPages;
     }

     /* takes object with specific book property key then call appropiate 
     set method for that key/property and sets the value */
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
     get isbn() {
         return this._isbn;
     }

     get publisher() {
        return this._publisher;
     }

     get totalPages() {
        return this._totalPages;
     }

     get upc() {
        return this._upc;
     }

     get pubLocation() {
        return this._pubLocation;
     }

     get price() {
        return this._price;
     }

     /* SETTERS */
     set isbn(isbn) {
        this._isbn = isbn;
     }

     set publisher(publisher) {
        this._publisher = publisher;
     }

     set totalPages(totalPages) {
        this._totalPages = totalPages;
     }

     set upc(upc) {
         this._upc = upc;
     }

     set pubLocation(pubLocation) {
        this._pubLocation = pubLocation;
    }

    set price(price) {
        this._price = price;
    }
}
