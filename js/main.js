var entryArr = [];

$(document).ready(function () {
  
    $('#new-entry').click(function(){
      
      var bookTitle = $('#book-title').val();
      var author = $('#author').val();
      var userDetails = bookTitle + author;
      entryArr.push(userDetails);
      console.log(entryArr);
      document.getElementById("marc-form").reset();
    });
    
    $('#btnSaveNDownload').click(function () {
      var bookTitle = $('#book-title').val();
      var author = $('#author').val();
      var userDetails = "=000  00000nam\\\\22000004a\\4500" + "\n" + bookTitle + "\n" + author;
      
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
  });