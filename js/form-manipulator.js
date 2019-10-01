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

  appendManualEntryForm() {
    const FORM_TAG = this.elementCreator2({
      type: "form",
      value: null
    });

    const H1_TAG = this.elementCreator2({
      type: "h1",
      value: "Manual Entry"
    });

    const FIELDSET_TAG = this.elementCreator2({
      type: "fieldset",
      value: null
    });

    const TITLE_LABEL = this.elementCreator2({
      type: "label",
      value: "Title:",
      attributes: {
        class: "req-field",
        for: "title-entry-inp"
      }
    });

    const TITLE_INPUT = this.elementCreator2({
      type: "input",
      value: null,
      attributes: {
        type: "text",
        name: "title-entry-inp"
      }
    });

    const AUTHOR_LABEL = this.elementCreator2({
      type: "label",
      value: "Author:",
      attributes: {
        class: "semi-req-field",
        for: "author-entry-inp"
      }
    });

    const AUTHOR_INPUT = this.elementCreator2({
      type: "input",
      value: null,
      attributes: {
        type: "text",
        name: "title-entry-inp"
      }
    });

    const LANGUAGE_LABEL = this.elementCreator2({
      type: "label",
      value: "Language:",
      attributes: {
        class: "req-field",
        for: "language-entry-inp"
      }
    });

    const LANGUAGE_SELECT = this.elementCreator2({
      type: "select",
      value: null,
      attributes: {
        name: "language-entry-inp"
      }
    });

    const LANGUAGE_OPTION_DEFAULT = this.elementCreator2({
      type: "option",
      value: "Select Language",
      attributes: {
        selected: "",
        disabled: ""
      }
    });

    const LANGUAGE_OPTION_ENG = this.elementCreator2({
      type: "option",
      value: "English",
      attributes: {
        value: "eng"
      }
    });

    const LANGUAGE_OPTION_SPA = this.elementCreator2({
      type: "option",
      value: "Spanish",
      attributes: {
        value: "spa"
      }
    });

    const LANGUAGE_OPTION_DUAL = this.elementCreator2({
      type: "option",
      value: "Both",
      attributes: {
        value: "dual"
      }
    });

    // Eventual appends

    formTag.appendChild(h1Tag);

    fieldsetTag.appendChild(titleLabel);
    fieldsetTag.appendChild(titleInput);
    fieldsetTag.appendChild(authorLabel);
    fieldsetTag.appendChild(authorInput);

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

  elementCreator2(elementObject) {
    /*
    const elementObject = {
      type: "option",
      value: "Select Language",
      attributes: {
        selected: "",
        disabled: ""
      }
    };
    */

    let element = document.createElement(elementObject.type);

    if (elementObject.value !== null) {
      element.textContent = elementObject.value;
    }

    if (Object.keys(elementObject.attributes).length > 0) {
      for (const key in elementObject.attributes) {
        element.setAttribute(key, elementObject.attributes[key]);
      }
    }

    return element;
  }
}
