var ldrField = "=LDR  00000cam\\\\2200000\\a\\4500";
var zeroOneField = "=001  \\\\\\95022800";
var entryArr = [];
var entryNumber = 0;

$(document).ready(function () {
  
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