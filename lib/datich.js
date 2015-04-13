/**
 * Modules dependencies
 */

var cheerio = require('cheerio');

var lib = {
  inspect: {
    "numeric": require('./inspect/numeric.js'),
    "dmy": require('./inspect/dmy.js'),
    "mdy": require('./inspect/mdy.js'),
    "ymd": require('./inspect/ymd.js'),
    "dsd": require('./inspect/dsd.js') // day sep date
  }
};


/**
 * @param {String} html
 *
 * @returns {Array} Dates found.
 */

module.exports = function (html) {

  // getting text
  var $ = cheerio.load(html);
  var text = $.root().text();

  var dates = [];

  dates = dates.concat(lib.inspect.numeric(text));
  /*
  dates = dates.concat(lib.inspect.dmy(text));
  dates = dates.concat(lib.inspect.mdy(text));
  dates = dates.concat(lib.inspect.ymd(text));
  dates = dates.concat(lib.inspect.dsd(text));
  */

  // sorting dates
  dates.sort(function (a, b) {
    return a.index - b.index;
  });

  return dates;

};
