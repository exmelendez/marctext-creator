var ldrTag = "=LDR  00000sam\\\\2200000\\a\\4500";
var ctrlNumberTag = "=001  ";
var ctrlNumIdTag = "=003  DLC";
var dateTimeTranTag = "=005  ";
var pubDataTag = "=008  ";
var catalogAgencyTag = "=040  \\\\$aSBCSICA$cSBCSICA";
var authorTag = "=100  ";
var mainTitleTag = "=245  10$a";

var entryArr = [];
var entryNumber = 0;

$(document).ready(function () {
  
    $('#new-entry').click(function(){

      if($('#pub-day').val().length === 1 || $('#pub-day').val() > 31 || $('#pub-year').val().length === 1 || $('#pub-year').val().length === 2 || $('#pub-year').val().length === 3 || $('#book-title').val().charAt($('#book-title').val().length-1) === '.' || $('#author').val().charAt($('#author').val().length-1) === '.') {
        alert("incorrect value");
      } else if($('#pub-month').val() === "" || $('#language').val() === "" || $('#book-title').val() === "" || $('#author').val() === ""){
        alert("missing required field");
      } else {
        var pubData = pubDataTagCreate($('#pub-year').val(), $('#pub-month').val(), $('#pub-day').val(), $('#language').val());
        
        var titleDetails = ldrTag + "\n" 
        + ctrlNumberTag + marcDate("ctrlNum") + "\n" 
        + ctrlNumIdTag + "\n" 
        + dateTimeTranTag + marcDate("dateTimeTran") + "\n" 
        + pubDataTag + pubData + "\n" 
        + catalogAgencyTag + "\n"
        + authorTag + authorTagSubfieldEval($('#author').val()) + $('#author').val() + "\n"
        + mainTitleTag + $('#book-title').val() + '.' +"\n\n";

        console.log(titleDetails);
        entryArr.push(titleDetails);
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
        }
      });
});

function pubDataTagCreate(year, month, day, lang) {
  var twoDigitYear = "";
  var fourDigitYear = year;

  if(year === "") {
    twoDigitYear = "\\\\";
    fourDigitYear = "\\\\\\\\";
  } else {
    twoDigitYear = year.charAt(2) + year.charAt(3);
    fourDigitYear = year;
  }

  if(day === "") {
    day = "\\\\";
  }

  return twoDigitYear + month + day + 's' + fourDigitYear + "\\\\\\\\" + "xxu" + "|||||||||||||||||" + lang + "\\\\";
}

function authorTagSubfieldEval(author) {
  var hasComma = containsComma(author);
  if(hasComma) {
    return '1\\$a';
  } else {
    return '0\\$a';
  }
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
      var year = fourDigYear.charAt(2) + fourDigYear.charAt(3);
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
  }
}