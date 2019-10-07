class FormManipulator {
  manInputDiv = document.getElementById("manual-inp");
  searchResults;

  /* 
    
    all HTML Elements
    - form
    - fieldset
    - label
      *Attributes
      - class
      - for
    - input
      *Attributes
      - id
      - type
      - name
      - value
    - select
      *Attributes
      - name
    - option
      *Attributes
      - selected
      - disabled
      - value
    - div
      *Attributes
      - id
    - optgroup
      *Attributes
      - label
    - button
      *Attributes
      - id
      - type
    
    */

  searchFormRender(resultData) {
    this.searchResults = resultData.items;

    const FORM_H1_TAG = document.querySelector("form>h1");
    FORM_H1_TAG.textContent = "Search Results";

    this.searchResultInputs(0);

    if (resultData.totalItems < 2) {
    } else {
      const PG_PICKER_ARROWS_DIV = document.getElementById("page-picker");
      PG_PICKER_ARROWS_DIV.style.visibility = "visible";
    }
  }

  manualEntryRender() {
    const FORM_H1_TAG = document.querySelector("form>h1");
    FORM_H1_TAG.textContent = "Manual Entry";
  }

  searchResultInputs(index) {
    // let index = 0;

    document.querySelector(
      "fieldset>input[name='title-entry-inp']"
    ).value = this.searchResults[index].volumeInfo.title;

    console.log(`Title: ${this.searchResults[index].volumeInfo.title}`);

    // TODO: create conditional which creates a select input if more than 1 author
    console.log(`Author: ${this.searchResults[index].volumeInfo.authors}`);

    console.log(
      `ISBN: ${this.searchResults[index].volumeInfo.industryIdentifiers[0].identifier}`
    );

    console.log(
      `Total Pages: ${this.searchResults[index].volumeInfo.pageCount}`
    );

    console.log(`Publisher: ${this.searchResults[index].volumeInfo.publisher}`);

    // TODO: Check date length, some may only be year but others appear in the format of "2011-10-24"
    console.log(
      `Year Published: ${this.searchResults[index].volumeInfo.publishedDate}`
    );
  }

  searchPageArrowRender(direction) {
    const currentPageSpan = document.querySelectorAll("#page-picker>span")[1];
    let searchPageNumber = Number(
      currentPageSpan.getAttribute("data-crnt-indx")
    );
    let newPageNum;

    if (direction === "left" && searchPageNumber !== 0) {
      searchPageNumber--;
      newPageNum = searchPageNumber + 1;
      currentPageSpan.setAttribute("data-crnt-indx", searchPageNumber);
      currentPageSpan.textContent = newPageNum;
    } else if (
      direction === "right" &&
      searchPageNumber !== this.searchResults.length - 1
    ) {
      searchPageNumber++;
      newPageNum = searchPageNumber + 1;
      currentPageSpan.setAttribute("data-crnt-indx", searchPageNumber);
      currentPageSpan.textContent = newPageNum;
    }
  }

  removeResetForm() {
    const snackDiv = document.getElementById("snackbar");

    document.getElementById("book-entry-cont").style.visibility = "hidden";
    document.getElementById("page-picker").style.visibility = "hidden";

    snackDiv.textContent = "Entry cancelled";
    snackDiv.className = "show";

    setTimeout(() => {
      snackDiv.className = snackDiv.className.replace("show", "");
    }, 5000);
  }

  /**
   * Removes form visibility.
   */
  remove() {
    document.getElementById("book-entry-cont").style.visibility = "hidden";
    document.getElementById("page-picker").style.visibility = "hidden";
  }
}
