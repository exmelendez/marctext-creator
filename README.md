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
