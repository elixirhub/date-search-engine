/**
 * @param {Object} result
 */

module.exports = function (result) {

  var i, j;

  for (i = 0; i < result.datesFound.length; i++) {

    for (j = i + 1; j < result.datesFound.length; j++) {

      if (result.datesFound[i].standardDate
        === result.datesFound[j].standardDate)
      {
        result.datesFound[j].alreadyExists = true;
        result.alreadyExistingDatesCount++;
      }

    }

  }

};
