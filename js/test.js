
const input = document.querySelector('input[type="file"]');
const isbnArr = [];
let csvUploaded = false;

input.addEventListener('change', function (e){
    
    if(input.files.length > 0) {
        csvUploaded = true;
    }
    
    console.log(input.files);
    const reader = new FileReader();
    reader.onload = function () {
        const lines = reader.result.split("\n").map(function (line) {
            return line.split(',');
        })
        // console.log(lines);
        // console.log(lines[1][1]);
        // console.log(lines.length);

        
        for(let i = 1; i < lines.length; i++){
            isbnArr.push(lines[i][0]);
        }
        console.log(isbnArr);

        if(csvUploaded) {
            isIsbnOnCsv("9789802572861");
        }

    }
    reader.readAsText(input.files[0]);
}, false);


/**
 * 
 * Functions to implement on live code
 * 
 */

 function isIsbnOnCsv(isbn) {
     
    for(var i = 0; i < isbnArr.length; i++) {
        if(isbn == isbnArr[i]) {
            console.log("true");
            return true;
        }
    }
    console.log("false");
    return false;
 }