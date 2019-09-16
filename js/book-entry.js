class BookEntry {

    constructor(type) {
        this.entry = {
            entryType : type
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

        for(let key in bookData) {
            if(bookData[key]){
                propNumCount++;
            }
        }

        this.entry.propCount = propNumCount;
    }

    /* returns entire "entry" object info */
    getEntryData() {
        return this.entry;
    }

    /* returns object information for book data entered */
    getBookInfo() {
        return this.entry.data;
    }

    /* counts length of data object inside of entry object to ensure it has right amount of info */
    isEntryValid() {
        return this.entry.propCount > 5;
    }
}