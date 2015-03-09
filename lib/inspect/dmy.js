var lib = {
  vocab: require('../vocab.js'),
  date: require('../date.js')
};


module.exports = function (text) {

  var currentYear = new Date().getUTCFullYear();

  var regex = new RegExp(

    // day
      '('
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

    year = arr[3];

    // The year is too high.
    if (parseInt(year, 10) > currentYear + 100)
      continue;

    month = arr[2].toLowerCase();
    day = arr[1].toLowerCase();

    dates.push({
      "value": arr[0],
      "index": regex.lastIndex - arr[0].length,
      "isd": year + '-'
           + lib.vocab.months.map[month] + '-'
           + lib.vocab.days.map[day]
    });

  }
   
  return dates;

};
