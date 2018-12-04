var ldrTag = "=LDR  00000sam\\\\2200000\\a\\4500";
var ctrlNumberTag = "=001  ";
var ctrlNumIdTag = "=003  DLC";
var dateTimeTranTag = "=005  ";
var titleCreationInfoTag = "=008  ";
var isbnPriceTag = "=020  ";
var catalogAgencyTag = "=040  \\\\$aSBCSICA$cSBCSICA";
var authorTag = "=100  ";
var mainTitleTag = "=245  10$a";
var publishInfoTag = "=260  \\\\";
var titleSizeTag = "=300  \\\\$a";
var locationClassificationTag = "=852  \\\\$aSBCSICA$h";
var tlcCLassificationTag = "=949  \\$a";

var entryArr = [];
var entryNumber = 0;

$(document).ready(function () {
  
    $('#new-entry').click(function(){

      if($('#pub-year').val().length === 1 || $('#pub-year').val().length === 2 || $('#pub-year').val().length === 3) {
        alert("incorrect value");

      } else if($('#language').val() === "" || $('#book-title').val() === "" || $('#author').val() === "" || $('#pub-year').val() === ""){
        alert("missing required field");

      } else {
          var createType;
        
          if($('#isbn').val() === ""){
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

function createRecordWithoutISBN(){
  var titleCreateData = tag008Create($('#pub-year').val(), $('#language').val());
        
        var titleDetails = ldrTag + "\n" 
        + ctrlNumberTag + marcDate("ctrlNum") + "\n" 
        + ctrlNumIdTag + "\n" 
        + dateTimeTranTag + marcDate("dateTimeTran") + "\n" 
        + titleCreationInfoTag + titleCreateData + "\n" 
        + catalogAgencyTag + "\n"
        + authorTag + tag100Create($('#author').val(), $('#author-unknown').is(':checked')) + "\n"
        + mainTitleTag + tag245Create($('#book-title').val(), $('#author').val(), $('#author-unknown').is(':checked')) + "\n"
        + publishInfoTag + tag260Create($('#pub-locale').val(),$('#publisher').val(),$('#pub-year').val(),$('#pub-year-unknown').is(':checked')) + "\n"
        + titleSizeTag + tag300Create($('#page-numbers').val()) + "\n"+ tlcCLassificationTag + $('#genre').val() + "$c" + getCallCode($('#genre').val()) + "$d" + first3CharCapital($('#author').val()) + "$g" + $('#barcode').val() + "\n\n";
        
        console.log(titleDetails);
        $("#last-entry").text("Last entry: " + $('#book-title').val() + "  |  ID: 1234597891");
        return titleDetails;
}

function createRecordWithISBN(){

}

function tag008Create(pubYear, lang) {
  var date = marcDate("tag008MarcCreate");
  
  return date + 's' + pubYear + "\\\\\\\\" + "xxu" + "|||||||||||||||||" + lang + "\\\\";
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
    location = "[s.l.] :"
  } else {
    location = "$a" + location + " :";
  }

  if(publisher === ""){
    publisher = "[s.n.],"
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

function tag852Create(genre, id, price, author) {

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