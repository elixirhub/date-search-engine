var lib = {
  date: require('../date.js')
};


module.exports = function (text) {

  var currentYear = new Date().getUTCFullYear();

  var regex = new RegExp(

      '([0-9]{1,4})' // any number

    + '(?: ){0,1}'
    + '(?:[/. \u2013\u2014-])' // separator
    + '(?: ){0,1}'

    + '([0-9]{1,4})' // any number

    + '(?: ){0,1}'
    + '(?:[/. \u2013\u2014-])' // separator
    + '(?: ){0,1}'

    + '([0-9]{1,4})' // any number

    , 'g'
  );

  var arr;
  var year, month, day;
  var dates = [];

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
    }

    // XX-DD-YYYY
    else if (arr[2] && arr[2].s.length <= 2 && arr[2].n > 12) {
      day = arr[2];
      arr[2] = null;
    }

    // YYYY-XX-DD
    else if (arr[3] && arr[3].s.length <= 2 && arr[3].n > 12) {
      day = arr[3];
      arr[3] = null;
    }

    // Default to DD-XX-YYYY.
    else if (arr[1] && arr[1].s.length <= 2) {
      day = arr[1];
      arr[1] = null;
    }

    // Default to YYYY-XX-DD.
    else if (arr[3] && arr[3].s.length <= 2) {
      day = arr[3];
      arr[3] = null;
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

    dates.push({
      "value": arr[0],
      "index": regex.lastIndex - arr[0].length,
      "isd": lib.date.standardizeYear(year.s) + '-'
           + lib.date.standardizeDayOrMonth(month.s) + '-'
           + lib.date.standardizeDayOrMonth(day.s)
    });

  }

  return dates;

};
