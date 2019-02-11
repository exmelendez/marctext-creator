const input = document.querySelector('input[type="file"]');
document.getElementById("wrapperID").onclick = function() {myFunction()};
let csvAttached = false;
const entryArr = [];
const isbnArr = [];

function myFunction() {
  document.getElementById("wrapperID").style.display="none"; 
  document.getElementById("mainContainer").style.display="block"; 
}

$(document).ready(function () {

  input.addEventListener('change', function (e){
    
    console.log(input.files);
    const reader = new FileReader();
    
    reader.onload = function () {
        const lines = reader.result.split("\n").map(function (line) {
            return line.split(',');
        })

        if(input.files.length > 0 && lines[0][0] === "ISBN") {
            document.getElementById("csv-fail-icon").style.display="none";
            document.getElementById("csv-success-icon").style.display="block";

            csvAttached = true;

            for(let i = 1; i < lines.length; i++){
                isbnArr.push(lines[i][0]);
            }
        }
    }
    reader.readAsText(input.files[0]);
  }, false);

  function toTitleCase(str) {
    return str.split(/\s+/).map(s => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()).join(" ");
  }
  
  $('.capital').on('keyup', function(event) {
    var $t = $(this);
    $t.val(toTitleCase($t.val()));
  });
  
    $('#new-entry').click(function(){

      var publishYear = $('#pub-year').val();
      var isbnNumber = String($('#isbn').val());
      var upc = String($('#upc').val());
      var bookLanguage = $('#language').val();
      var bookTitle = $('#book-title').val();
      var authorName = $('#author').val();
      var bookPrice = String($('#price').val());
      var bookBarcode = $('#barcode').val();
      var bookGenre = $('#genre').val();
      var isPublisherName = $('#author-unknown').is(':checked');
      var totalPages = $('#page-numbers').val();
      var publishLocation = $('#pub-locale').val();
      var publisherName = $('#publisher').val();
      var isPubYearUnknown = $('#pub-year-unknown').is(':checked');

      let upcIsbnMatch = false;

      if(isbnNumber != "" && upc != "") {
        if(isbnNumber === upc) {
          upcIsbnMatch = true;
        }
      }

      if(bookTitle === "" || authorName === "" || bookLanguage === "" || bookGenre === "" || bookGenre === null  || publishYear === "" || bookBarcode === ""){
        var fieldRequireList = [];
        fieldRequireList.push(bookTitle);
        fieldRequireList.push(authorName);
        fieldRequireList.push(bookLanguage);
        fieldRequireList.push(bookGenre);
        fieldRequireList.push(publishYear);
        fieldRequireList.push(bookBarcode);

        alert("missing " + determineMissingRequirement(fieldRequireList) + " field.");

      } else if(isbnNumber.length > 13 || publishYear.length === 1 || publishYear.length === 2 || publishYear.length === 3 || publishYear.length > 4 || !isPriceFormatCorrect(bookPrice)){
        var fieldErrorList = [];
        fieldErrorList.push(isbnNumber.length);
        fieldErrorList.push(publishYear);
        fieldErrorList.push(bookPrice);
        
        alert("incorrect value in " + determineErrorFields(fieldErrorList) + " field.");

      } else if(upcIsbnMatch || isbnNumber === bookBarcode || upc === bookBarcode) {

        alert("Duplicate number found");

      } else if(csvAttached && isIsbnOnCsv(isbnNumber)) {

        alert("ISBN already on CSV");

      } else {
          var bookCreate = bookMarcMaker(bookTitle, authorName, isPublisherName, bookLanguage, 
            bookGenre, totalPages, publishLocation, publisherName, publishYear,
            isPubYearUnknown, bookBarcode, bookPrice);
          var bookEntry = bookCreate.createBkEntry(isbnNumber, upc);
  
          entryArr.push(bookEntry);
          $("#last-entry").text("Last entry: " + bookTitle + "  |  ID: " + bookBarcode);
          document.getElementById("marc-form").reset();
          $("#entry-num").text("Entries: " + entryArr.length);
          document.getElementById("book-title").focus();
      }
    });

    $('#btnSaveNDownload').click(function () {
      if(entryArr.length === 0) {
        alert("at least 1 entry must be entered");
      } else {
        var blob = new Blob(entryArr, { type:"application/json;utf - 8" });
        var userLink = document.createElement('a');
        userLink.setAttribute('download',marcDate("save_date") + '_' + entryArr.length + randomCharGenerate() + '.txt');
        userLink.setAttribute('href', window.URL.createObjectURL(blob));
        userLink.click();
        entryNumber = 0;
        $("#entry-num").text("Entries: " + entryNumber);
        $("#last-entry").text("");
        entryArr.length = 0;
        }
    });

    $('#add-id-btn').click(function() {
      
      $("body > #tab > #input-form > #added-ids").append('<tr><td>Barcode/ID</td><td><input type="text" size="50"></td></tr>'); 
    });

});

function determineMissingRequirement(inputArr){
  var errorIndex = -1;

  for(var i = 0; i < inputArr.length; i++){
    if(inputArr[i] === "" || inputArr[i] === null){
      errorIndex = i;
      break;
    }
  }

  switch (errorIndex) {
    case 0:
      return "book title";

    case 1:
      return "author name";

    case 2:
      return "book language";

    case 3:
      return "book genre";

    case 4:
      return "publish year";

    case 5:
      return "book ID";

    default:
      return "unknown";
  }

}

function determineErrorFields(inputArr) {
  var isbnNumber = inputArr[0];
  var pubYear = inputArr[1];
  var price = inputArr[2];

  if(isbnNumber.length > 13) {
    return "isbn";
  }

  if(pubYear.length === 1 || pubYear.length === 2 || pubYear.length === 3 || pubYear.length > 4){
    return "publishing year";
  }

  if(!isPriceFormatCorrect(price)){
    return "price";
  }
}

function tag100Create(author, isPublisher) {
  var tagPrefix = "0\\$a";

  if(!isPublisher && containsComma(author)){
    tagPrefix = "1\\$a";
  } 
  return tagPrefix + periodCheckAdd(author);
}

function tag245Create(bookTitle, author, isPublisher) { 
  var authorStr = tag100Create(author, isPublisher);
  var authorSubField = "";

  if(authorStr.charAt(0) === "1") {
    var lastName = '';
    var index;

    for(var i = 0; i < author.length; i++) {
      if(author.charAt(i) != ',') {
        lastName += author.charAt(i);
      } else {
        index = i + 2;
        break;
      }
    }

    for(;index < author.length; index++) {
      authorSubField += author.charAt(index);
    }

    author = authorSubField + " " + lastName;
  }
  return bookTitle + " /" + "$c" + periodCheckAdd(author);
}

function tag260Create(location, publisher, pubYear, isDateUnknown) {
  if(location === ""){
    location = "$a[s.l.] :"
  } else {
    location = "$a" + location + " :";
  }

  if(publisher === ""){
    publisher = "$b[s.n.],"
  } else {
    publisher = "$b" + publisher + ",";
  }

  if(isDateUnknown){
    pubYear = "$c[" + pubYear + "?]";
  } else {
    pubYear = "$c" + pubYear + ".";
  }

  return location + publisher + pubYear;
}

function tag300Create(pageNumber) {

  if(pageNumber === ""){
    pageNumber = "1 v"
  } else {
    pageNumber += " p";
  }

  return periodCheckAdd(pageNumber);
}

function tag949Create(genre, author, id, price) {
  var holdingCode = getCallCode(genre);
  var threeCharAuthor = first3CharCapital(author);

  if(price === "") {
    return genre + "$c" + holdingCode + "$d" + threeCharAuthor + "$g" + id;
  } else {
    return genre + "$c" + holdingCode + "$d" + threeCharAuthor + "$g" + id + "$p" + price;
  }
}

function getCallCode(genre) {
  var callCode;

  switch (genre) {

    case "SBEF":
      callCode = "EF"    
      break;

    case "SBFLM":
      callCode = "FL"    
      break;

    case "SBJBIO":
      callCode = "B"    
      break;
    
    case "SBJF":
      callCode = "F"    
      break;

    case "SBJNF":
      callCode = "NF"    
      break;

    case "SBLPFLM":
      callCode = "LFLM"    
      break;

    case "SBLPMA":
      callCode = "LMA"    
      break;

    case "SBLPRE":
      callCode = "LRE"    
      break;

    case "SBLPS1":
      callCode = "LS1"    
      break;

    case "SBLPS2":
      callCode = "LS2"    
      break;

    case "SBLPSC":
      callCode = "LSC"    
      break;

    case "SBLPSPFLM":
      callCode = "LSFLM"    
      break;

    case "SBLPSK":
      callCode = "LSK"    
      break;

    case "SBLPSPMA":
      callCode = "LSMA"    
      break;

    case "SBLPSS":
      callCode = "LSS"    
      break;

    case "SBLPSPS1":
      callCode = "LSS1"    
      break;

    case "SBLPSPS2":
      callCode = "LSS2"    
      break;

    case "SBLPSPSC":
      callCode = "LSSC"    
      break;

    case "SBLPSPSK":
      callCode = "LSSK"    
      break;

    case "SBLPSPSS":
      callCode = "LSSS"    
      break;

    case "SBPB":
      callCode = "PB"    
      break;

    case "SBPO":
      callCode = "PO"    
      break;

    case "SBPROF":
      callCode = "PRO"    
      break;

    case "SBREF":
      callCode = "REF"    
      break;

    case "SBSPFLM":
      callCode = "SFL"    
      break;

    case "SBSPJNF":
      callCode = "SNF"    
      break;

    case "SBSPEF":
      callCode = "SEF"    
      break;

    case "SBSPBI":
      callCode = "SB"    
      break;

    case "SBSPJF":
      callCode = "SF"    
      break;

    case "SBSPPB":
      callCode = "SPB"    
      break;

    case "SBSPPO":
      callCode = "SPO"    
      break;

  }
  return callCode;
}

function isPriceFormatCorrect(price){
  var result = false;
  var decimalNumCount = 0;

  if(price === "") {
    result = true;
  } else {
    for(var i = 0; i < price.length; i++){
      if(price.charAt(i) === '.'){
        decimalNumCount++;
      }
    }
  }

  if(decimalNumCount === 1) {
    result = true;
  }

  return result;
}

function priceFormatFixer(price) {
  if(price.charAt(0) === "$"){
    var priceStrHold = "";
    for(var i = 1; i < price.length; i++){
      priceStrHold += price.charAt(i);
    }
    price = priceStrHold;
  }
  return price;
}

function periodCheckAdd(inputStr){
  if(inputStr.charAt(inputStr.length-1) != '.') {
    inputStr = inputStr + '.';
  }

  return inputStr;
}

function first3CharCapital(author) {
  var authorChars = "";

  for(var i = 0; i < author.length; i++){
    if(authorChars.length < 3) {
      if(author.charAt(i) === "'" || author.charAt(i) === "-"){
        continue;
      } else {
        authorChars += author.charAt(i).toUpperCase();
      }
    } else {
      break;
    }
  }

  return authorChars;
}

function containsComma(author){
  var hasComma = false;
  for(var i = 0; i < author.length; i++) {
    if(author.charAt(i) === ","){
      hasComma = true;
      break;
    }
  }
  return hasComma;
}

function marcDate(type) {
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
    case "ctrlNum":
      var ctrlNum = "";
      
      ctrlNum+= month;
      ctrlNum+= day;
      ctrlNum+= year;
      ctrlNum+= hour;
      ctrlNum+= minutes;
      ctrlNum+= seconds;
    
      return ctrlNum;

    case "dateTimeTran":
      var dateTimeTranTag = "";
      
      dateTimeTranTag += fourDigYear + month + day + hour + minutes + seconds + ".0";

      return dateTimeTranTag;

    case "tag008MarcCreate":
      var tag008 = "";
      
      tag008 = year + month + day;

      return tag008;

    case "save_date":
      var saveDate = "";
      
      saveDate = fourDigYear + month + day;

      return saveDate;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomCharGenerate() {
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 
  't', 'u', 'v', 'w', 'x', 'y', 'z',];

  var firstChar = getRandomInt(alphabet.length);
  var secondChar = getRandomInt(alphabet.length);
  var thirdChar = getRandomInt(alphabet.length);

  return alphabet[firstChar] + alphabet[secondChar] + alphabet[thirdChar];
}

function bookMarcMaker(bookTitle, bookAuthor, isPublisher, 
  bookLanguage, bookGenre, bookPageNum, bookPubLocation, 
  bookPublisher, bookPublishYear, isPubYearUnkown, bookID, bookPrice){
  return {
    leaderTag000 : "=LDR  00000sam\\\\2200000\\a\\4500\n",
    ctrlNumberTag001 : "=001  " + marcDate("ctrlNum") + "\n",
    ctrlNumIdTag003 : "=003  NyBxCSIC\n",
    dateTimeTranTag005 : "=005  " + marcDate("dateTimeTran") + "\n",
    titleCreationInfoTag008 : "=008  " + marcDate("tag008MarcCreate") + 's' + bookPublishYear + "\\\\\\\\xxu||||||||||||||\\||" + bookLanguage + "\\\\\n",
    isbnTag020 : "=020  \\\\$a",
    upcTag024 : "=024  1\\$a",
    catalogAgencyTag040 : "=040  \\\\$aNyBxCSIC$cNyBxCSIC\n",
    authorTag100 : "=100  " + tag100Create(bookAuthor, isPublisher) + "\n",
    mainTitleTag245 : "=245  10$a" + tag245Create(bookTitle, bookAuthor, isPublisher) + "\n",
    publishInfoTag260 : "=260  \\\\" + tag260Create(bookPubLocation,bookPublisher,bookPublishYear, isPubYearUnkown) + "\n",
    titleSizeTag300 : "=300  \\\\$a" + tag300Create(bookPageNum) + "\n",
    tlcClassificationTag949 : "=949  \\\\$a" + tag949Create(bookGenre, bookAuthor, bookID, priceFormatFixer(bookPrice)) + "\n\n",
    createBkEntry(bookISBN, upc) {
      let titleDetails = this.leaderTag000
      + this.ctrlNumberTag001
      + this.ctrlNumIdTag003
      + this.dateTimeTranTag005
      + this.titleCreationInfoTag008;

      if(bookISBN != ""){
        titleDetails += this.isbnTag020 + bookISBN + "\n";
      }

      if(upc != ""){
        titleDetails += this.upcTag024 + upc + "\n";
      }

      titleDetails += this.catalogAgencyTag040
        + this.authorTag100
        + this.mainTitleTag245
        + this.publishInfoTag260
        + this.titleSizeTag300
        + this.tlcClassificationTag949;

      console.log(titleDetails);
      return titleDetails;
    }
  }
}

//Takes in ISBN number as a string then checks the ISBN Array to see if it exists
function isIsbnOnCsv(isbn) {
     
  for(var i = 0; i < isbnArr.length; i++) {
      if(isbn == isbnArr[i]) {
          return true;
      }
  }
  return false;
}