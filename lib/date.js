/**
 * standardizeYear
 *
 * @param {String|Number} year
 *
 * @returns {Error|String} The sandardized year.
 */

function standardizeYear (year) {

  var sYear, nYear;
  if (typeof year === 'string') {
    nYear = parseInt(year, 10);
    sYear = year;
  } else if (typeof year === 'number') {
    nYear = year;
    sYear = year.toString(10);
  } else
    throw new Error('The <year> parameter must be a string or a number.');

  if (sYear.length !== 2 && sYear.length !== 4)
    return new Error('The number of digits should be 2 or 4');

  if (sYear.length === 4) return sYear;

  var sFullYear = new Date().getUTCFullYear().toString();
  var sPart1 = sFullYear.substr(0, 2);
  var sPart2 = sFullYear.substr(2);
  var nPart1 = parseInt(sPart1, 10);
  var nPart2 = parseInt(sPart2, 10);

  if (nYear <= nPart2 + 30)
    sYear = sPart1 + sYear;
  else
    sYear = (nPart1 - 1) + sYear;

  return sYear;

}


/**
 * standardizeDayOrMonth
 *
 * @param {String|Number} dom – day or month
 *
 * @returns {String} The sandardized day or month.
 */

function standardizeDayOrMonth (dom) {

  var sDom;
  if (typeof dom === 'string') sDom = dom;
  else if (typeof dom === 'number') sDom = dom.toString(10);
  else throw new Error('The <dom> parameter must be a string or a number.');

  if (sDom.length === 2) return sDom;

  return '0' + sDom;

}


/**
 * standardToNumeric
 *
 * @param {String} standardDate
 *
 * @returns {Number} numericDate
 */

function standardToNumeric (standardDate) {

  var date = new Date(
    parseInt(standardDate.substr(0, 4), 10),
    parseInt(standardDate.substr(5, 2), 10) - 1, // month begin with 0
    parseInt(standardDate.substr(8), 10)
  );

  return date.getTime();

}


/**
 * Exports
 */

exports.standardizeYear = standardizeYear;
exports.standardizeDayOrMonth = standardizeDayOrMonth;
exports.standardToNumeric = standardToNumeric;
