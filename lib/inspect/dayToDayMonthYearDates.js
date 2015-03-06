var lib = {
  vocab: require('../vocab.js'),
  date: require('../date.js')
};


/**
 * This function inspect dates written like "17 - 18 November 2015".
 * In this case, this is the date 17 November 2015 that is recognized.
 * (Note: searching from-to would be better with index.)
 *
 * @param {String} text – Text to search in.
 * @param {Object} result
 */

module.exports = function (text, result) {

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
    + '(?: ){0,1}'
    + '[\u2013\u2014-]'
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

  var arr, obj;
  var year, month, day;

  while ((arr = regex.exec(text)) !== null) {

    year = arr[4];

    // The year is too high.
    if (parseInt(year, 10) > currentYear + 100)
      continue;

    month = arr[3].toLowerCase();
    day = arr[1].toLowerCase(); // first day

    obj = {
      "type": 'letters',
      "format": 'day to day month year',
      "text": {
        "value": arr[1], // first day
        "index": regex.lastIndex - arr[0].length
      },
      "standardDate": year + '-'
                + lib.vocab.months.map[month] + '-'
                + lib.vocab.days.map[day]
    };

    obj.timeInMs = lib.date.standardDateInMs(obj.standardDate);

    result.datesFound.push(obj);
    result.dayToDayMonthYearDatesCount++;

  }

};
