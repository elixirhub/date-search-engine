/**
 * Modules dependencies
 */

var cheerio = require('cheerio');

var lib = {
  date: {
    inspect: {
      "numericDates": require('./inspect/numericDates.js'),
      "dayMonthYearDates": require('./inspect/dayMonthYearDates.js'),
      "monthDayYearDates": require('./inspect/monthDayYearDates.js'),
      "yearMonthDayDates": require('./inspect/yearMonthDayDates.js'),
      "dayToDayMonthYearDates": require('./inspect/dayToDayMonthYearDates.js'),
      "fromToDates": require('./inspect/fromToDates.js'),
      "betweenFromToDates": require('./inspect/betweenFromToDates.js'),
      "alreadyExistingDates": require('./inspect/alreadyExistingDates.js')
    }
  }
};


/**
 * date.inspect
 *
 * @param {String} html
 * @param {Object} [options]
 *        {Array} [options.logs] – The following values are available: "main".
 *
 * @returns {Object} Result for the date inspection.
 */

module.exports = function (html, options) {

  // defaults
  options = options || {};
  options.logs = options.logs || [];
  
  var result = {
    "datesFound": [],
    "numericDatesCount": 0,
    "dayMonthYearDatesCount": 0,
    "monthDayYearDatesCount": 0,
    "yearMonthDayDatesCount": 0,
    "dayToDayMonthYearDatesCount": 0,
    "fromToDatesCount": 0,
    "betweenFromToDatesCount": 0,
    "alreadyExistingDatesCount": 0,
    "uniqueDatesCount": 0
  };

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Getting text from HTML – processing...');

  // getting text
  var $ = cheerio.load(html);
  var text = $.root().text();

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Getting text from HTML – done.'
      + ' (text.length = %d)' , text.length);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding numeric dates – processing...');

  // finding numeric dates
  lib.date.inspect.numericDates(text, result);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding numeric dates – done.'
      + ' (%d date(s) found.)' , result.numericDatesCount);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding Day-Month-Year dates – processing...');

  // finding Day-Month-Year dates
  lib.date.inspect.dayMonthYearDates(text, result);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding Day-Month-Year dates – done.'
      + ' (%d date(s) found.)' , result.dayMonthYearDatesCount);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding Day-To-Day-Month-Year dates'
      + ' – processing...');

  // finding Day-To-Day-Month-Year dates
  lib.date.inspect.dayToDayMonthYearDates(text, result);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding Day-To-Day-Month-Year dates'
      + ' – done. (%d date(s) found.)' , result.dayToDayMonthYearDatesCount);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding Month-Day-Year dates – processing...');

  // finding Month-Day-Year dates
  lib.date.inspect.monthDayYearDates(text, result);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding Month-Day-Year dates – done.'
      + ' (%d date(s) found.)' , result.monthDayYearDatesCount);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding Year-Month-Day dates – processing...');

  // finding Year-Month-Day dates
  lib.date.inspect.yearMonthDayDates(text, result);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding Year-Month-Day dates – done.'
      + ' (%d date(s) found.)' , result.yearMonthDayDatesCount);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Sorting the dates – processing...');

  // sorting the dates
  result.datesFound.sort(function (a, b) {
    return a.text.index - b.text.index;
  });

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Sorting the dates – done.'
      + ' (%d date(s) sorted.)' , result.datesFound.length);
  
  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding from-to dates – processing...');

  // finding from-to dates
  lib.date.inspect.fromToDates(text, result);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding from-to dates – done.'
      + ' (%d date(s) found.)', result.fromToDatesCount);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding dates between from-to dates'
      + ' – processing...');

  // finding dates between from-to dates
  lib.date.inspect.betweenFromToDates(result);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding dates between from-to dates'
      + ' – done. (%d date(s) found.)'
      , result.betweenFromToDatesCount);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding already existing dates'
      + ' – processing...');

  // finding already existing dates
  lib.date.inspect.alreadyExistingDates(result);

  // log
  if (~options.logs.indexOf('main'))
    console.log('date-search-engine: Finding already existing dates'
      + ' – done. (%d date(s) found.)'
      , result.alreadyExistingDatesCount);

  // counting unique dates
  for (var i = 0, c = 0; i < result.datesFound.length; i++) {
    if (!result.datesFound[i].alreadyExists && !result.datesFound[i].between)
      result.uniqueDatesCount++;
  }

  return result;

};
