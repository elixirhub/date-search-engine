/**
 * @param {Object} result
 */

module.exports = function (result) {

  var i, j;
  var arrIndexFromDate, arrIndexToDate;

  for (i = 0; i < result.datesFound.length; i++) {

    arrIndexFromDate = null;
    arrIndexToDate = null;

    // store the indexs of the from-to date
    if (result.datesFound[i].from) {
      arrIndexFromDate = i;
      arrIndexToDate = result.datesFound[i].iTo;
    } else if (result.datesFound[i].to) {
      arrIndexFromDate = result.datesFound[i].iFrom;
      arrIndexToDate = i;
    }

    // jump if it's not a from-to date
    if (arrIndexFromDate === null || arrIndexToDate === null) continue;

    // it's a from-to date
    for (j = 0; j < result.datesFound.length; j++) {

      // jump if it's a from-to date
      if (result.datesFound[j].from || result.datesFound[j].to) continue;

      // if the date is between the from-to date
      if (result.datesFound[j].timeInMs
        >= result.datesFound[arrIndexFromDate].timeInMs
        && result.datesFound[j].timeInMs
        <= result.datesFound[arrIndexToDate].timeInMs
      ) {
        // set between
        result.datesFound[j].between = {
          "iFrom": arrIndexFromDate,
          "iTo": arrIndexToDate
        };
      }
      
    }

  }

};
