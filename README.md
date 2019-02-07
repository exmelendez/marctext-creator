# MarcText Creator

## What is MarcText Creator?
A browser based app which allows a user the ability to input information about a book and generate a txt file which can be converted into a Marc Record.

## What is a Marc record?
The U.S. national standard for dissemination of bibliographic data. Marc stands for Machine Readable Cataloging which is basically a set of digital formats for the description of items catalogued by libraries, such as books.

### Marc Visibility
Officially a marc record ends in the file format *.mrc* and therefore it's contents cannot be easily viewed and or modified. Special software like MarcEdit3, MarcMakr/MarcBrkr and more are applications that allow you to convert, view and or edit a marc record. At it's core, Marc records are primarily a set of specific character codes, spacing and formatting representative of an item or title. I compare marc to any other programming language like XML, CSS, HTML, etc.

#### Marc Sample code/text before conversion to marc format
```
=000  00000nam\\2200000\a\4500
=001  0123456789
=003  NjP
=005  19930422091534.7
=008  920806s1991\\\\nju\\\\\\\\\\\000\0\\eng\d
=020  \\$a0777000008
=040  \\$aNjP$cNjP
=100  1\$aSmith, John W.,$d1955-
=245  10$aPolitical tides in America /$cby John W. Smith III; with an introduction by Spencer Yarborough.
=260  \\$aCamden, NJ :$bTrendsetter Press$c1991.
=300  \\$a344 p. :$bill., maps ;$c26 cm.
=650  \7$aPolitical science$zUnited States.$2lcsh
=650  \7$aPopulism$zUnited States.$2lcsh
=700  1\$aYarborough, Spencer,$d1931-
```

#### Sample Explanation
The sample above displays the inner content and formatting of the actual text file created. Given the software and procedure I have implemented, this text file is needed to create a marc record. Above, you see every line begins with an equal sign and a set of numbers. Each number and/or line is called a field and represents a different set of information for the title.

For instance, field number *008* above *(5th line down)* begins with a set of numbers which represent the date creation of the marc record starting with the year, followed by the month and ending with the day. After that there is an *S* which signifies a single year for the publication date and after that *(the 1991)* is the year the item/title was published. Further in this line *(or field)* you notice the characters *eng* which represent the language of the title; *eng* means "english".

In field *100 (line 8)* above, this is where you notice the author's name will go. Depending how detailed the creater wants to be, you may also include the year of birth and/or death of the author. This is useful in cases where there are other individuals with the same name.

After that in field *245 (line 9)* you notice this is where the name of the title/item will go. You also notice more information and symbols with a *$* which signify another type of information. Almost every field has tags or subfields that indicate a specific set of information. *($a, $b, and $d are subfields or tags)*

#### Marc Crucial Info
Marc is a very specific form of formatting characters and information, one which can easily get in depth allowing one to log any and every detail of an item/title. Rules and explanations are managed by the library of congress and can be found at <https://www.loc.gov/marc/bibliographic/>

## Why create this?

### Explaining the problem
At work I manage and run the school library where we recently experienced a server crash resulting in a total loss of data. Software had to be reinstalled, marc records had to be uploaded again, but the true setback was that we also lost all the titles that were manually put in and did not come from any sort of marc record. This was months of work now lost and once again needed. Although I was assured the server has proper backups this time around, I did not want to risk it and decided to research and dive deep into the creation of marc records.

Now the program we have would allow us to create marc records from scratch, but by default it creates sixteen (16) fields and because it's a windows DOS running type program, shortcuts like tab and enter do not work as they typically would. Additionally this would contribute to wasted time as the software really only requires six (6) fields. I would have to invest time in deleting fields, ensuring the proper spaces and symbols are there and repeat the tedious process for every title/item. The library easily has over 1,500 titles that need to be entered manually; I needed to figure out how to make the process faster and simpler. This would also allow me to recruit others to assist me without having to educate them on the intricacies of marc record formatting.

### The End Result
![alt text](https://i.imgur.com/hMyiPPh.jpg)

#### App Guide
As you can see above, the app contains eleven (11) text input fields that correlate to information about a book, however please notice that there are only six (6) bold fields that are absolutely necessary.

A user may enter as many book titles as they wish, once a book entry is complete they must click on the green *Submit entry* button, the form resets and a brief summary of the last title entered is displayed at the bottom; when dealing with many books at a time one can easily forgot where they left off if interrupted.

Once done entering titles, the user may click on the red *Complete and Download* button which will download the text file to be converted into a marc record file.

##### Converting to a marc Record

The web app only create a plain text file which opens from any text editor program like *Note Pad* or *Text Edit*, but this file is needed by other programs in order to convert it into an official marc record. There are a number of ways and/or programs that allow one to convert text files into marc records but my preferred method is by using one called *Marc Edit* which is a free software that can be downloaded at <https://marcedit.reeset.net/>. In Marc edit you can convert the file, name it and save it wherever you like, once the marc record file is created I take that new file and upload it into our library inventory/database system.

## NOTES

### Development
Anyone can use and/or modify the program however please keep in mind that I wrote it specifically for our organization and the software used here *(TLC)* so some of the information may not apply to your library and some fields may not follow the Library of Congress marc record standards.

Also, J Query is used for some sections, you may reference J query with a CDN however I choose to include the JS file locally to prevent potential network errors when working with others.

#### Updates
* 1/28/2019: Wrote new function, consolidating method to create book entries based on prescence of ISBN and removing 20 lines of duplicate code.
* 1/28/2019: Restructured language selection dropdown resulting in removal of 28 lines of code which included the tag 008 & 041 creation functions.
* 1/28/2019: Replaced book detail variables for book object eliminating initial variables in JS.
* 2/2/2019: Added ability to input a 024, UPC field.
* 2/6/2019: Added auto capital letter of first/last name in author field.
* 2/6/2019: Fixed error catching null value if no book genre is chosen.
* 2/7/2019: Added if statements preventing entry submission when both ISBN and UPC field are empty.

#### Future
* Add ability to add quantity/dynamic field for more title/ID #'s
* Add backend function to search entries for matching ISBN's previously input to prevent duplication
* Visual redesign w/ pop up notices
* Add ability to enter/separate UPC barcode when it does not match ISBN
* Create pop-up help guide/FAQ
* Ability to view full list and remove selected entries
* Search a spreadsheet before entry to ensure the book/title is not already in the system