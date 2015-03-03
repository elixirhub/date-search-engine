/**
 * alreadyExists
 *
 * @param {Array} dates
 * @returns {Array} The dates modified.
 */

module.exports = function (dates) {

  var i, j;

  for (i = 0; i < dates.length; i++) {

    for (j = i + 1; j < dates.length; j++) {

      if (dates[i].standard === dates[j].standard)
        dates[j].alreadyExists = true;

    }

  }

  return dates;

};
