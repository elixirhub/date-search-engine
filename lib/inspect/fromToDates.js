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
 * @param {Object} result
 */

module.exports = function (text, result) {

  var allDates = '';
  for (var i = 0; i < result.datesFound.length; i++) {
    if (i !== 0) allDates += '|';
    allDates += '(?:';
    allDates += escapeStringRegexp(result.datesFound[i].text.value);
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
    + '(?:'
      + '(?:'
        + '(?: ){0,1}'
        + '[\u2013\u2014-]'
        + '(?: ){0,1}'
      + ')'
      + '|'
      + '(?: to )'
    + ')'

    // date
    + '(' + allDates + ')'

    , 'ig'

  );

  var arr, i, j
    , arrIndexFromDate, arrIndexToDate
    , textIndexFromDate, textIndexToDate;

  while (result.datesFound.length && (arr = regex.exec(text)) !== null) {

    textIndexFromDate = regex.lastIndex - arr[0].length;
    textIndexToDate = regex.lastIndex - arr[2].length;

    // from/to
    for (i = 0; i < result.datesFound.length; i++) {

      if (result.datesFound[i].text.index === textIndexFromDate) {
        result.datesFound[i].from = true;
        arrIndexFromDate = i;
      } else if (result.datesFound[i].text.index === textIndexToDate) {
        result.datesFound[i].to = true;
        arrIndexToDate = i;
      }

    }

    result.datesFound[arrIndexFromDate].iTo = arrIndexToDate;
    result.datesFound[arrIndexToDate].iFrom = arrIndexFromDate;

    result.fromToDatesCount++;

  }
};
