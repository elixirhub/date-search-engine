/**
 * Modules dependencies
 */

var cheerio = require('cheerio');

var lib = {
  date: {
    inspect: {
      "withoutLetters": require('./inspect/withoutLetters.js'),
      "withLettersDMY": require('./inspect/withLettersDMY.js'),
      "withLettersMDY": require('./inspect/withLettersMDY.js'),
      "withLettersYMD": require('./inspect/withLettersYMD.js'),
      "fromTo": require('./inspect/fromTo.js'),
      "alreadyExists": require('./inspect/alreadyExists.js')
    }
  }
};


/**
 * date.inspect
 *
 * @param {String} html
 *
 * @returns {Object} Results for the date inspection.
 */

module.exports = function (html) {

  var $ = cheerio.load(html);
  var text = $.root().text();

  var dates = [];

  dates = dates.concat(lib.date.inspect.withoutLetters(text));
  dates = dates.concat(lib.date.inspect.withLettersDMY(text));
  dates = dates.concat(lib.date.inspect.withLettersMDY(text));
  dates = dates.concat(lib.date.inspect.withLettersYMD(text));

  dates = dates.sort(function (a, b) {
    return a.text.index - b.text.index;
  });

  dates = lib.date.inspect.fromTo(text, dates);
  dates = lib.date.inspect.alreadyExists(dates);


  var results = {
    "dates": dates
  };

  results.uniqueCount = 0;
  results.fromToCount = 0;
  for (var i = 0, c = 0; i < dates.length; i++) {
    if (!dates[i].alreadyExists && !dates[i].between) {
      results.uniqueCount++;
      if (dates[i].from) results.fromToCount++;
    }
  }

  return results;

};
