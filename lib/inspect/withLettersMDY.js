var lib = {
  vocab: require('../vocab.js'),
  date: require('../date.js')
};


/**
 * withLettersMDY
 *
 * This function inspect dates written with letters, following this order:
 * month, day, year.
 *
 * @param {String} text – Text to search in.
 *
 * @returns {Array} Dates that have been finding, converted into big endian
 *          format (i.e. YYYY-MM-DD).
 */

module.exports = function (text) {

  var dates = [];
  var currentYear = new Date().getUTCFullYear();

  var regex = new RegExp(

    // day name
      '('
      + '(?:' + lib.vocab.days.names.join('|') + ')'
      + '(?: |(?:, ))'
    + '){0,1}'

    // month
    + '(' + lib.vocab.months.bothForm.join('|') + ')'
    + '[^0-9]{0,5}'

    // day
    + '('
      + lib.vocab.days.letters.join('|') + '|'
      + lib.vocab.days.numbersAndLetters.join('|') + '|'
      + lib.vocab.days.numbers.join('|')
    + ')'
    + '[^0-9]{0,5}'

    // year
    + '([0-9]{4})'

    , 'ig'
  );

  var arr, i, year, month, day, objDate;

  while ((arr = regex.exec(text)) !== null) {

    year = arr[4];

    // The year is too high.
    if (parseInt(year, 10) > currentYear + 100)
      continue;

    month = arr[2].toLowerCase();
    day = arr[3].toLowerCase();

    objDate = {
      "type": 'with letters',
      "format": 'month day year',
      "text": {
        "value": arr[0],
        "index": regex.lastIndex - arr[0].length
      },
      "standard": year + '-'
                + lib.vocab.months.map[month] + '-'
                + lib.vocab.days.map[day]
    };

    objDate.numericDate = lib.date.standardToNumeric(objDate.standard);

    dates.push(objDate);

  }

  return dates;

};