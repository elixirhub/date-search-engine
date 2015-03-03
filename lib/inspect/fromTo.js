/**
 * Modules dependencies
 */

var escapeStringRegexp = require('escape-string-regexp');

var lib = {
  vocab: require('../vocab.js'),
  date: require('../date.js')
};


/**
 * inspect.fromTo
 *
 * @param {String} text
 * @param {Array} dates
 *
 * @retuns {Array} The modified dates.
 */

module.exports = function (text, dates) {

  var allDates = '';
  for (var i = 0; i < dates.length; i++) {
    if (i !== 0) allDates += '|';
    allDates += '(?:';
    allDates += escapeStringRegexp(dates[i].text.value);
    allDates += ')';
  }

  var regex = new RegExp(

    // date
      '(' + allDates + ')'

    // day name
    + '(?:'
      + '(?: |(?:, ))'
      + '(?:' + lib.vocab.days.names.join('|') + ')'
    + '){0,1}'

    // separator
    + '(?:(?: - )|(?: to ))'

    // date
    + '(' + allDates + ')'

    , 'ig'

  );

  var arr, i, j
    , arrIndexFromDate, arrIndexToDate
    , textIndexFromDate, textIndexToDate;

  while (dates.length && (arr = regex.exec(text)) !== null) {

    textIndexFromDate = regex.lastIndex - arr[0].length;
    textIndexToDate = regex.lastIndex - arr[2].length;

    // from/to
    for (i = 0; i < dates.length; i++) {

      if (dates[i].text.index === textIndexFromDate) {
        dates[i].from = true;
        arrIndexFromDate = i;
      } else if (dates[i].text.index === textIndexToDate) {
        dates[i].to = true;
        arrIndexToDate = i;
      }

    }

    dates[arrIndexFromDate].iTo = arrIndexToDate;
    dates[arrIndexToDate].iFrom = arrIndexFromDate;

  }

  // between
  for (i = 0; i < dates.length; i++) {

    arrIndexFromDate = null;
    arrIndexToDate = null;

    if (dates[i].from) {
      arrIndexFromDate = i;
      arrIndexToDate = dates[i].iTo;
    } else if (dates[i].to) {
      arrIndexFromDate = dates[i].iFrom;
      arrIndexToDate = i;
    }

    if (arrIndexFromDate !== null && arrIndexToDate !== null) {

      for (j = 0; j < dates.length; j++) {

        if (j !== arrIndexFromDate && j !== arrIndexToDate
          && !dates[j].from && !dates[j].to)
        {

          if (dates[j].numericDate >= dates[arrIndexFromDate].numericDate
            && dates[j].numericDate <= dates[arrIndexToDate].numericDate) {
            dates[j].between = {
              "iFrom": arrIndexFromDate,
              "iTo": arrIndexToDate
            };
          }
        
        }
      }
    }

  }

  return dates;

};
