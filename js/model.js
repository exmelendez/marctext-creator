console.log('it works');

class Model {
    constructor() {
        console.log('made new model obj');
        this.bookEntryList = [];
    }

    /**
 * Takes a number input which it will use to search the Google Books API 
 * and then use the fetch method to return a JSON.
 * @param {number} isbn number it will use to search the google books API
 */
  apiSearch (isbn) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then(response => {
        console.log('response: ', response.json());
        return response.json();
    })
    .then(data => {
        
        console.log('second then begin');
        return data["totalItems"] < 1 ? 'No results found' : data.items;

        /*
        if (data["totalItems"] < 1) {
          return "No results found";
        } else {
            //create custom bookData literal to return to controller
        }
        */
      })
      .catch(err => {
        console.log("Error w/ fetch API/Function");
        return 'API Error';
      });
  }

  /* TEST for now */
  async apiSearch2 (isbn) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const data = await response.json();
        // console.log(JSON.stringify(data));
        // const result = await data.totalItems < 1 ? 'No results found' : data.items;

        return data.totalItems < 1 ? 'No results found' : data.items;
    
    } catch (error) {
        console.log("Error w/ fetch API/Function");
        return 'API Error';
    }
  }
    /**
     * Book entry data is passed as an Object literal, is iterated through one value at a time and passed to the tagCreator function and then returned as a properly formatted marc record string to be pushed into a new object literal, with that final object being pushed to the entry array.
     * @param {Object} bookData Data passed from controller
     */
    manualEntry(bookData) {
        
        for (const key in bookData) {
            if (bookData.hasOwnProperty(key)) {
                const element = bookData[key];
                
            }
        }

        this.pushBookEntry = bookData;
    }

    /**
     * Takes string keyword used to properly format and return date and/or time combination string. String options are "ctrl", "time-tran", "tag008" or "save-date"
     * @param {String} type keyword used by switch statement
     * @returns {String} Date as a string in one of several formattings
     */
    marcDate(type) {
        var now = new Date();
      
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var fourDigYear = String(now.getFullYear());
        var hour = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
      
        var year = fourDigYear.charAt(2) + fourDigYear.charAt(3);
      
        if(month < 10) {
          month = '0'+ month;
        }
      
        if(day < 10) {
          day = '0'+ day;
        }
      
        if(hour < 10) {
          hour = '0'+ hour;
        }
      
        if(minutes < 10) {
          minutes = '0'+ minutes;
        }
      
        if(seconds < 10) {
          seconds = '0'+ seconds;
        }
      
        switch (type) {
          case "ctrl":
            return String(month) + String(day) + String(year) + String(hour) + String(minutes) + String(seconds);
           
          case "time-tran":
            return fourDigYear + String(month) + String(day) + String(hour) + String(minutes) + String(seconds) + ".0";
      
          case "tag008":
            return String(year) + String(month) + String(day);
      
          case "save-date":
            return fourDigYear + String(month) + String(day);
        }
      }

    newBookEntry(data, entryType = 'manual') {
        switch (entryType) {
            case 'api':
                result = this.apiSearch2(data).then(back => back);
                console.log(result)
                break;
                
            default:
                this.manualEntry(data);
                break;
        }
    }

    /**
     * Using a switch statement, and string keyword, will pass book individual data to the proper case to format/generate a marc record string.
     * @param {String} tagType Marc tag/field type
     * @param {String} input book data, if applicable. May be null
     * @returns {String} properly formatted marc record tag/field string
     */
    tagCreator(tagType, input = null) {
        switch (tagType) {
            case 'ldr':

                if(input !== null && input !== '0' ) {
                    return this.tagCreatorLdr(input);
                } else {
                    return this.tagCreatorLdr();
                }

            case 'tag001':
                return `=001  ${this.marcDate('ctrl')}`;

            case 'tag003':
                    return '=003  NyBxCSIC';

            case 'tag005':
                    return `=005  ${this.marcDate('time-tran')}`;

            case 'tag008':
                    return `=008  ${this.marcDate('time-tran')}`;
        
            default:
                break;
        }
    }

    /**
     * Generates a marc record formatted tag/field 008 string
     * @param {String} creationDate Tag 008 formatted date
     * @param {String} pubLanguage Language of the book using 3 char code, "eng" for English or "spa" for spanish
     * @param {String} pubYear Publication year of book
     * @returns {String} marc record tag/field 008 formatted string
     */
    tagCreator008(creationDate, pubLanguage, pubYear = '1455') {
        const openingTag = '=008  ';
        const pubDateType = 's';
        const date2 = '0000';
        const countryPubCode = 'xxu';
        const illustrationTypes = '####';
        const targetAudience = '#';
        const itemForm = '#';
        const contentNature = '####';
        const govtPub = '#';
        const conferencePub = '0';
        const festschrift = '0';
        const pubIndex = '|';
        const _undefined = '#';
        const literaryForm = '|';
        const biography = '|';
        const extra_space = '\\';

        return openingTag + creationDate + pubDateType + pubYear + 
    }

    /**
     * Generates marc record leader field/tag string, properly formatted.
     * @param {String} pageCount number of pages, if applicable. May be left empty or null.
     * @returns {String} Leader field/tag string in proper marc record format
     */
    tagCreatorLdr(pageCount = '00000') {
        const pgCountLength = pageCount.length;

        if(pgCountLength < 5) {
            const zerosNeeded = 5 - pgCountLength;
            let countPrefix = '';

            for (let i = 0; i < zerosNeeded; i++) {
                countPrefix += '0'
            }

            pageCount = countPrefix + pageCount;
        }

        const tagOpen = '=LDR  ';
        const recordStatus = 'n';
        const recordType = 'a';
        const bibLevel = 'm';
        const slashes = '\\';
        const charPositions = '22';
        const encodingLevel = '#';
        const catalogForm = 'u';
        const resourceRecordLevel = '#';
        const lenOfField = '4';
        const lenOfCharPos = '5';
        const lenOfImplement = '0';
        const _undefined = '0';

        return tagOpen + pageCount + recordStatus + recordType + bibLevel + slashes + charPositions + '00000' + encodingLevel + catalogForm + resourceRecordLevel + lenOfField + lenOfCharPos + lenOfImplement + _undefined;
    }
    
    /**
     * @returns {Array} returns list of book entries as object literals
     */
    get bookEntries() {
        return this.bookEntryList;
    }

    /**
     * @returns {Number} returns size/length of book entry list/array
     */
    get entryTotal() {
        return this.bookEntryList.length;
    }

    set pushBookEntry(bookData) {
        this.bookEntryList.push(bookData);
    }
    
}