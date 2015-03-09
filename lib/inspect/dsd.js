var lib = {
  vocab: require('../vocab.js'),
  date: require('../date.js')
};


/**
 * dsd stands for "day sep date"
 * This function inspect dates written like "17 - 18 November 2015".
 * In this case, this is the date 17 November 2015 that is recognized.
 */

module.exports = function (text) {

  var currentYear = new Date().getUTCFullYear();

  var regex = new RegExp(

    // non-digit
       '\\D'

    // day
    + '('
      + lib.vocab.days.letters.join('|') + '|'
      + lib.vocab.days.numbersAndLetters.join('|') + '|'
      + lib.vocab.days.numbers.join('|')
    + ')'

    // sep
    + '(?: ){0,1}'
    + '(?:'
      + '(?:[\u2013\u2014-])|(?:and)|(?:to)'
    + ')'
    + '(?: ){0,1}'

    // day
    + '('
      + lib.vocab.days.letters.join('|') + '|'
      + lib.vocab.days.numbersAndLetters.join('|') + '|'
      + lib.vocab.days.numbers.join('|')
    + ')'
    + '[^0-9]{0,5}'

    // month
    + '(' + lib.vocab.months.bothForm.join('|') + ')'
    + '[^0-9]{0,5}'

    // year
    + '([0-9]{4})'

    , 'ig'
  );

  var arr;
  var year, month, day;
  var dates = [];

  while ((arr = regex.exec(text)) !== null) {

    year = arr[4];

    // The year is too high.
    if (parseInt(year, 10) > currentYear + 100)
      continue;

    month = arr[3].toLowerCase();
    day = arr[1].toLowerCase(); // first day

    dates.push({
      "value": arr[1], // first day
      "index": regex.lastIndex - arr[0].length,
      "isd": year + '-'
           + lib.vocab.months.map[month] + '-'
           + lib.vocab.days.map[day]
    });

  }

  return dates;

};
