var lib = {
  date: require('../date.js')
};


/**
 * withoutLetters
 *
 * This function inspect dates written without letters.
 * European format preced US format in case of confrontation (e.g. 1/2/2014
 * becomes 1 February 2014).
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

      '([0-9]{1,4})'

    + '(?: ){0,1}'
    + '(?:[/.-])'
    + '(?: ){0,1}'

    + '([0-9]{1,4})'

    + '(?: ){0,1}'
    + '(?:[/.-])'
    + '(?: ){0,1}'

    + '([0-9]{1,4})'

    , 'g'
  );

  var arr, i, year, month, day, format, type, objDate;

  while ((arr = regex.exec(text)) !== null) {

    arr[1] = {"s": arr[1], "n": parseInt(arr[1], 10)};
    arr[2] = {"s": arr[2], "n": parseInt(arr[2], 10)};
    arr[3] = {"s": arr[3], "n": parseInt(arr[3], 10)};

    /**
     * Year
     */

    // YYYY-XX-XX or YY-XX-XX
    if (arr[1].s.length === 4
      || arr[1].s.length === 2 && arr[1].n > 31
    ) {
      year = arr[1];
      arr[1] = null;
    }

    // XX-XX-YYYY or XX-XX-YY
    else if (arr[3].s.length === 4
      || arr[3].s.length === 2 && arr[3].n > 31
    ) {
      year = arr[3];
      arr[3] = null;
    }

    // Default to XX-XX-YY.
    else if (arr[3].s.length === 2) {
      year = arr[3];
      arr[3] = null;
    }

    // Unable to find the year (e.g. 3 digits; XX-YYYY-XX).
    else continue;

    // The year is to high.
    if (year.n > currentYear + 100)
      continue; 

    /**
     * Day
     */

    // DD-XX-YYYY
    if (arr[1] && arr[1].s.length <= 2 && arr[1].n > 12) {
      day = arr[1];
      arr[1] = null;
      format = 'day month year';
    }

    // XX-DD-YYYY
    else if (arr[2] && arr[2].s.length <= 2 && arr[2].n > 12) {
      day = arr[2];
      arr[2] = null;
      format = 'month day year';
    }

    // YYYY-XX-DD
    else if (arr[3] && arr[3].s.length <= 2 && arr[3].n > 12) {
      day = arr[3];
      arr[3] = null;
      format = 'year month day';
    }

    // Default to DD-XX-YYYY.
    else if (arr[1] && arr[1].s.length <= 2) {
      day = arr[1];
      arr[1] = null;
      format = 'day month year';
    }

    // Default to YYYY-XX-DD.
    else if (arr[3] && arr[3].s.length <= 2) {
      day = arr[3];
      arr[3] = null;
      format = 'year month day';
    }

    // Unable to find the day (e.g. 3 digits).
    else continue;

    // The day is too high.
    if (day.n > 31)
      continue;

    /**
     * Month
     */

    if (arr[1]) month = arr[1];
    else if (arr[2]) month = arr[2];
    else month = arr[3];

    // The month is too high.
    if (month.n > 12)
      continue;

    objDate = {
      "type": 'without letters',
      "format": format,
      "text": {
        "value": arr[0],
        "index": regex.lastIndex - arr[0].length
      },
      "standard": lib.date.standardizeYear(year.s) + '-'
                + lib.date.standardizeDayOrMonth(month.s) + '-'
                + lib.date.standardizeDayOrMonth(day.s)
    };

    objDate.numericDate = lib.date.standardToNumeric(objDate.standard);

    dates.push(objDate);
  }

  return dates;

};
