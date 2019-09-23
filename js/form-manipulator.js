class FormCreator {
  manInputDiv = document.getElementById("manual-inp");

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

  createForm() {
    const formTag = this.elementCreator("form");
    const fieldsetTag = this.elementCreator("fieldset");
    const labelTag = this.elementCreator("label");
    const input = this.elementCreator("input");
    const labelTag2 = this.elementCreator("label");
    const input2 = this.elementCreator("input");

    input2.setAttribute("type", "text");
    input2.setAttribute("name", "author-entry-inp");
    input2.setAttribute("value", "");

    labelTag2.setAttribute("class", "semi-req-field");
    labelTag2.setAttribute("for", "author-ent-inp");

    labelTag.setAttribute("class", "req-field");
    labelTag.setAttribute("for", "title-entry-inp");

    input.setAttribute("type", "text");
    input.setAttribute("name", "title-entry-inp");
    input.setAttribute("value", "");

    labelTag.textContent = "Title:";
    labelTag2.textContent = "Author:";

    fieldsetTag.appendChild(labelTag);
    fieldsetTag.appendChild(input);
    fieldsetTag.appendChild(labelTag2);
    fieldsetTag.appendChild(input2);
    formTag.appendChild(fieldsetTag);
    this.manInputDiv.appendChild(formTag);
  }

  /**
   * Given string of html element type will create & return that HTML node
   * @param {string} type string used to create html element of that type
   * @returns {Node} HTML element
   */
  elementCreator(type) {
    return document.createElement(type);
  }

  attributeAppender(element, type, value) {
    element.setAttribute(type, value);
  }
}
