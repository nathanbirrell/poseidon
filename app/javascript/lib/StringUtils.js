export default class StringUtils {
  /**
   * Converts a string to proper case
   * eg 'a string of sentences' to 'A String Of Sentences'
   * @param {string} value - The string to covert
   */
  static toProperCase(value) {
    return value.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static capitalise(value) {
    return value.replace(/^(.)/, (_, firstChar) => firstChar.toUpperCase());
  }

  /**
   * Takes a phone nunber as a string and attempts to format it nicely for display purposes.
   *
   * The following cases are handled:
   * XXXXXXXX => XXXX XXXX      // No area code   (8 digits)
   * 04XXXXXXXX => 04XX XXX XXX // Mobile number  (starts with 04)
   * 0XXXXXXXXX => 0X XXXX XXXX // With area code (starts with 0)
   *
   * @param {string} phoneNumber
   * @returns {string} formatted phone number
   */
  static toFormattedNumber(phoneNumber) {
    if (typeof phoneNumber !== 'string') {
      return '';
    }
    let formattedNumber = phoneNumber.replace(/\s/g, '');

    let breakPoints = [];

    if (formattedNumber.length === 8) {
      breakPoints = [4];
    } else if (formattedNumber.indexOf('04') === 0) {
      breakPoints = [4, 7];
    } else if (formattedNumber.indexOf('0') === 0) {
      breakPoints = [2, 6];
    }

    breakPoints.sort().reverse().forEach(bp => {
      formattedNumber = `${formattedNumber.slice(0, bp)} ${formattedNumber.slice(bp)}`;
    });

    return formattedNumber;
  }

  /**
   * Formats a string by replacing placeholders.
   *
   * Example:
   * StringUtils.formatted('I have {0} apples and {1} oranges', '12', '4') => 'I have 12 apples and 4 oranges'
   *
   * @param {string} string The string to process
   * @param {Array} replace  arguments to replace with
   * @returns {*}
   */
  static formatted(string, ...replace) {
    let formattedStr = string;

    if (replace) {
      replace.forEach((v, i) => {
        formattedStr = formattedStr.replace(`{${i}}`, v);
      });
    }

    return formattedStr;
  }

  static isNumeric(value) {
    return !isNaN(value);
  }

  static trimAllWhitespace(value) {
    return value.replace(/\s+/g, '');
  }
}
