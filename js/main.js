var ldrTag = "=LDR  00000sam\\\\2200000\\a\\4500";
var ctrlNumberTag = "=001  ";
var ctrlNumIdTag = "=003  NyBxCSIC";
var dateTimeTranTag = "=005  ";
var titleCreationInfoTag = "=008  ";
var isbnTag = "=020  \\\\$a";
var catalogAgencyTag = "=040  \\\\$aNyBxCSIC$cNyBxCSIC";
var titleLanguageInput = "=041  "
var authorTag = "=100  ";
var mainTitleTag = "=245  10$a";
var publishInfoTag = "=260  \\\\";
var titleSizeTag = "=300  \\\\$a";
var locationClassificationTag = "=852  \\\\$aSBCSICA$h";
var tlcCLassificationTag = "=949  \\\\$a";

var entryArr = [];
var entryNumber = 0;

$(document).ready(function () {
  
    $('#new-entry').click(function(){

      var publishYear = $('#pub-year').val();
      var isbnNumber = String($('#isbn').val());
      var bookLanguage = $('#language').val();
      var bookTitle = $('#book-title').val();
      var authorName = $('#author').val();
      var bookPrice = String($('#price').val());
      var bookBarcode = $('#barcode').val();
      var bookGenre = $('#genre').val();

      if(bookTitle === "" || authorName === "" || bookLanguage === "" || bookGenre === "" || publishYear === "" || bookBarcode === ""){
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
        fieldErrorList.push(isbnNumber);
        fieldErrorList.push(publishYear);
        fieldErrorList.push(bookPrice);
        
        alert("incorrect value in " + determineErrorFields(fieldErrorList) + " field.");

      } else {
          var createType;
        
          if(isbnNumber === ""){
            createType = createRecordWithoutISBN();
          } else {
            createType = createRecordWithISBN();
          }

        entryArr.push(createType);
        document.getElementById("marc-form").reset();
        entryNumber++;
        $("#entry-num").text("Entries: " + entryNumber);
      }
    });

    $('#btnSaveNDownload2').click(function () {
      if(entryNumber === 0) {
        alert("at least 1 entry must be entered");
      } else {
        var blob = new Blob(entryArr, 
                            {
                              type:"application/json;utf - 8"
                            }
                           );
        var userLink = document.createElement('a');
        userLink.setAttribute('download', "someName" + '.txt');
        userLink.setAttribute('href', window.URL.createObjectURL(blob));
        userLink.click();
        entryNumber = 0;
        $("#entry-num").text("Entries: " + entryNumber);
        $("#last-entry").text("");
        }
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

  if(isbnNumber > 13) {
    return "isbn";
  }

  if(pubYear.length === 1 || pubYear.length === 2 || pubYear.length === 3 || pubYear.length > 4){
    return "publishing year";
  }

  if(!isPriceFormatCorrect(price)){
    return "price";
  }
}

function createRecordWithoutISBN(){
  var titleCreateData = tag008Create($('#pub-year').val(), $('#language').val());
        
        var titleDetails = ldrTag + "\n" 
        + ctrlNumberTag + marcDate("ctrlNum") + "\n" 
        + ctrlNumIdTag + "\n" 
        + dateTimeTranTag + marcDate("dateTimeTran") + "\n" 
        + titleCreationInfoTag + titleCreateData + "\n" 
        + catalogAgencyTag + "\n"
        + titleLanguageInput + tag041Create($('#language').val()) + "\n"
        + authorTag + tag100Create($('#author').val(), $('#author-unknown').is(':checked')) + "\n"
        + mainTitleTag + tag245Create($('#book-title').val(), $('#author').val(), $('#author-unknown').is(':checked')) + "\n"
        + publishInfoTag + tag260Create($('#pub-locale').val(),$('#publisher').val(),$('#pub-year').val(),$('#pub-year-unknown').is(':checked')) + "\n"
        + titleSizeTag + tag300Create($('#page-numbers').val()) + "\n"
        + tlcCLassificationTag + tag949Create($('#genre').val(), $('#author').val(), $('#barcode').val(), $('#price').val()) + "\n\n";
        
        console.log(titleDetails);
        $("#last-entry").text("Last entry: " + $('#book-title').val() + "  |  ID: " + $('#barcode').val());
        return titleDetails;
}

function createRecordWithISBN(){
  var titleCreateData = tag008Create($('#pub-year').val(), $('#language').val());
        
        var titleDetails = ldrTag + "\n" 
        + ctrlNumberTag + marcDate("ctrlNum") + "\n" 
        + ctrlNumIdTag + "\n" 
        + dateTimeTranTag + marcDate("dateTimeTran") + "\n" 
        + titleCreationInfoTag + titleCreateData + "\n"
        + isbnTag + $('#isbn').val() + "\n"
        + catalogAgencyTag + "\n"
        + titleLanguageInput + tag041Create($('#language').val()) + "\n"
        + authorTag + tag100Create($('#author').val(), $('#author-unknown').is(':checked')) + "\n"
        + mainTitleTag + tag245Create($('#book-title').val(), $('#author').val(), $('#author-unknown').is(':checked')) + "\n"
        + publishInfoTag + tag260Create($('#pub-locale').val(),$('#publisher').val(),$('#pub-year').val(),$('#pub-year-unknown').is(':checked')) + "\n"
        + titleSizeTag + tag300Create($('#page-numbers').val()) + "\n"
        + tlcCLassificationTag + tag949Create($('#genre').val(), $('#author').val(), $('#barcode').val(), $('#price').val()) + "\n\n";
        
        console.log(titleDetails);
        $("#last-entry").text("Last entry: " + $('#book-title').val() + "  |  ID: " + $('#barcode').val());
        return titleDetails;
}

function tag008Create(pubYear, lang) {
  var date = marcDate("tag008MarcCreate");

  if(lang === "dual") {
    lang = "spa";
  }
  
  return date + 's' + pubYear + "\\\\\\\\" + "xxu" + "\\\\\\\\\\\\\\" + lang + "\\\\";
}

function tag041Create(language) {
  var firstIndicator;

  if(language === "dual") {
    firstIndicator = '1';
    return firstIndicator + "\\$aspa$heng";
  } else {
    firstIndicator = '0';
    return firstIndicator + "\\$a" + language;
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

function tag852Create(genre, id, author) {
  var tagString = "=852  \\\\$aSBCSICA$h";
  var holdingCode = getCallCode(genre);
  var threeCharAuthor = first3CharCapital(author);

  tagString += holdingCode + ' ' + threeCharAuthor + "$p"
  + id;

  return tagString;
}

function tag949Create(genre, author, id, price) {
  var holdingCode = getCallCode(genre);
  var threeCharAuthor = first3CharCapital(author);

  if(price === "") {
    return genre + "$c" + holdingCode + "$d" + threeCharAuthor + "$g" + id;
  } else {
    return genre + "$c" + holdingCode + "$d" + threeCharAuthor + "$g" + id + "$p$" + price;
  }
}

function getCallCode(genre) {
  var callCode;

  switch (genre) {
    case "SBBIO":
      callCode = "J B"    
      break;

    case "SBEF":
      callCode = "EF"    
      break;

    case "SBJF":
      callCode = "J F"    
      break;

    case "SBJNF":
      callCode = "J"    
      break;

    case "SBPROF":
      callCode = "PROF"    
      break;

    case "SBREF":
      callCode = "REF"    
      break;
  }
  return callCode;
}

function isPriceFormatCorrect(price){
  var result = false;

  if(price === "") {
    result = true;
  } else {
    for(var i = 0; i < price.length; i++){
      if(price.charAt(i) === '.'){
        result = true;
        break;
      }
    }
  }

  return result;
}

function periodCheckAdd(inputStr){
  if(inputStr.charAt(inputStr.length-1) != '.') {
    inputStr = inputStr + '.';
  }

  return inputStr;
}

function first3CharCapital(author) {
  return author.charAt(0).toUpperCase() + author.charAt(1).toUpperCase() + author.charAt(2).toUpperCase();
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

  var month = now.getMonth();
  var day = now.getDate();
  var fourDigYear = String(now.getFullYear());
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  var year = fourDigYear.charAt(2) + fourDigYear.charAt(3);

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
      month+= 1;
      
      tag008 = year + month + day;

      return tag008;
  }
}