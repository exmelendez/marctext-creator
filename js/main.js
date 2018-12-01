var ldrTag = "=LDR  00000sam\\\\2200000\\a\\4500";
var zeroOneField = "=001  \\\\\\95022800";
var entryArr = [];
var entryNumber = 0;

$(document).ready(function () { console.log(time());
  
    $('#new-entry').click(function(){
      
      var bookTitle = $('#book-title').val();
      var author = $('#author').val();
    //   var titleDetails = bookTitle + author;
      var titleDetails = ldrField + "\n" + zeroOneField + "\n\n";

      entryArr.push(titleDetails);
      document.getElementById("marc-form").reset();
      entryNumber++;
      $("#entry-num").text("Entries: " + entryNumber);
    });
    
    $('#btnSaveNDownload').click(function () {
      var bookTitle = $('#book-title').val();
      var author = $('#author').val();
      var userDetails = ldrField + "\n" + bookTitle + "\n" + author + "\n";
      var test = "cool";
 
      var blob = new Blob([userDetails], 
                          {
                            type:"application/json;utf - 8"
                          }
                         );
      var userLink = document.createElement('a');
      userLink.setAttribute('download', bookTitle + '.txt');
      userLink.setAttribute('href', window.URL.createObjectURL(blob));
      userLink.click();
    });

    $('#btnSaveNDownload2').click(function () {
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
      });
});

function time() {
  var ctrlNum = "";
  var now = new Date();

  var month = now.getMonth();
  var day = now.getDate();
  var yearInit = String(now.getFullYear());
  var year = yearInit.charAt(2) + yearInit.charAt(3);
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

  ctrlNum+= month;
  ctrlNum+= day;
  ctrlNum+= year;
  ctrlNum+= hour;
  ctrlNum+= minutes;
  ctrlNum+= seconds;

  return ctrlNum;
}