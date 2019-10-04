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

  multiSearchPageRender(resultData) {
    const FORM_H1_TAG = document.querySelector("form>h1");
    FORM_H1_TAG.textContent = "Search Results";

    if(resultData.totalItems < 2) {

    } else {
      this.searchResults = resultData.items;
      // console.log(this.searchResults);
      // console.log(this.searchResults[0].volumeInfo.title);
      const PG_PICKER_ARROWS_DIV = document.getElementById('page-picker');
      PG_PICKER_ARROWS_DIV.style.visibility = 'visible';
    }
  }

  manualEntryRender() {
    const FORM_H1_TAG = document.querySelector("form>h1");
    FORM_H1_TAG.textContent = "Manual Entry";
  }

  searchPageArrowRender(direction) {
    const currentPageSpan = document.querySelectorAll('#page-picker>span')[1];
    let searchPageNumber = Number(currentPageSpan.getAttribute('data-crnt-indx'));
    let newPageNum;

    if(direction === 'left' && searchPageNumber !== 0) {
      searchPageNumber--;
      newPageNum = searchPageNumber + 1;
      currentPageSpan.setAttribute('data-crnt-indx', searchPageNumber);
      currentPageSpan.textContent = newPageNum;
      
    } else if(direction === 'right' && searchPageNumber !== this.searchResults.length - 1) {
      searchPageNumber++;
      newPageNum = searchPageNumber + 1;
      currentPageSpan.setAttribute('data-crnt-indx', searchPageNumber);
      currentPageSpan.textContent = newPageNum;
    }
  }

  removeResetForm() {
    const snackDiv = document.getElementById("snackbar");

    document.getElementById("book-entry-cont").style.visibility = 'hidden';
    document.getElementById('page-picker').style.visibility = 'hidden';

    snackDiv.textContent = 'Entry cancelled';
    snackDiv.className = "show";

    setTimeout(() => {
      snackDiv.className = snackDiv.className.replace("show", "");
    }, 5000);

  }
}
