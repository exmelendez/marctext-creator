/**
 * Provides functions for book property inputs to ensure it has 
 * content and to provide formatting or functions like date.
 */
class InputProcessor {

    /**
     * Returns boolean provided argument does not contain only white space.
     * @param {string} input Book property from HTML input
     */
    static hasValue(input) {
        return input.trim().length > 0;
    }

    /**
     * Given a string that only contains numbers it will convert and return the same value as a number type.
     * @param {string} input String to convert to number
     * @returns {number} Converted string as a Number type.
     */
    static convertStringToNumber(input) {
        let trimInput = input.trim();
        let containsOnlyNumbers = !/\D/.test(trimInput);
        containsOnlyNumbers ? trimInput = Number(trimInput) : console.log('incorrect input values in convertToString method.');
        
        return trimInput;
    }
    
    // TODO: Finish + install "todo-tree in VS Code"
     static authorNameFormatter(author) {
        let firstName = "";
        let lastName = "";
      
        for (let i = 0; i < author.length; i++) {
          if (author.charAt(i) != " ") {
            firstName += author.charAt(i);
          } else {
            lastName = author.slice(i + 1, author.length) + ", ";
            break;
          }
        }
      
        return lastName + firstName;
      }
}