# Datich

## Purpose

A node.js module for searching dates and times, and converting them into an
international format.


## Support

* Numeric dates
* Dates with letters
* From-to dates
* Existing dates
* Between dates

#### Numeric dates

##### Separators

* "/" slash
* "." dot
* " " space
* "-" dash
* "–" en-dash (U+2013; vim digraph Ctrl+K - N)
* "—" em-dash (U+2014; vim digraph Ctrl+K - M)

Separators may be preceded and/or followed by one space.

##### Support

Order:
* Little-endian (day, month, year)
* Middle-endian (month, day, year)
* Big-endian (year, month, day)

Year, month and day:
* Two-digit year
* One-digit month
* One-digit day

##### Examples

Order:
* 15/01/2013 (Little-endian)
* 01 / 16 / 2013 (Middle-endian)
* 2013-01-17 (Big-endian)

Year, month and day:
* 18-01-13 (Two-digit year)
* 19/1/2013 (One-digit month)
* 3.01.2013 (One-digit day)

Default:
* 04/05/2013 (Gives 04 to day)
* 04/05/06 (Gives 05 to the month and 2006 to the year)


#### Dates with letters

##### Support

Order:
* Little-endian (day, month, year)
* Middle-endian (month, day, year)
* Big-endian (year, month, day)

Day:
* Day in full letters (e.g. twenty-second)
* Day in both numbers and letters (e.g. 2nd)
* Day in number
* One-digit day

Month:
* Month in long form letters (e.g. January)
* Month in short form letters (e.g. Jan)

Other:
* Case-insensitive search

##### Examples

Order:
* 15 January 2014 (Little-endian)
* January 16 2014 (Middle-endian)
* 2014 January 17 (Big-endian)

Day:
* the Fourteenth of January, 2014 (Day in full letters)
* July the fourteenth, 2014 (Day in full letters)
* January 15th, 2014 (Day in both numbers and letters)
* 2014 January 16 (Day in number)
* 5 January 2014 (One-digit day)

Month:
* 6th January 2014 (Month in long form letters)
* 7 Jan 2014 (Month in short form letters)

Other:
* 2014 jan 8 (Case-insensitive search)


#### From-to dates

##### Separators

* "-" dash
* "–" en-dash (U+2013; vim digraph Ctrl+K - N)
* "—" em-dash (U+2014; vim digraph Ctrl+K - M)

The above separators may be preceded and/or followed by one space.

* " to "

##### Support

* Day name (e.g. Saterday)
* Two-in-one dates

##### Examples

* 13 July 2015 – 14 July 2015 (en-dash separator)
* 15/1/2015 to 16/1/2015 (" to " separator)
* 2015 July 17, Friday - 2015 July 18, Saterday (Day name)
* 17-18 November 2015 (Two-in-one dates)

#### Existing dates

* 14 May 2016
* 14 May 2016 (alreadyExists set to true)

#### Between dates

* 15 May 2016 - 20 May 2016
* 15 May 2016 (between + alreadyExists)
* 16 May 2016 (between)
* 17 May 2016 (between)

## Result

```Javascript
result {
  datesFound: [],
  numericDatesCount: Number,
  dayMonthYearDatesCount: Number,
  monthDayYearDatesCount: Number,
  yearMonthDayDatesCount: Number,
  dayToDayMonthYearDatesCount: Number,
  fromToDatesCount: Number,
  betweenFromToDatesCount: Number,
  alreadyExistingDatesCount: Number,
  uniqueDatesCount: Number
}
```

```Javascript
result.datesFound[i] {
  type: "numeric" or "letters",
  format: "day month year", "month day year" or "year month day",
  text: { value: String, index: Index in the text },
  standardDate: 'YYYY-MM-DD',
  timeInMs: xxxxxxxxxxxx
  [from: true],
  [to: true],
  [iFrom: Index in datesFound],
  [iTo: Index in datesFound],
  [alreadyExists: true],
  [between: { iFrom: Index in datesFound, iTo: Index in datesFound}]
}
```

## Installation

Manually:

```Shell
git clone git://github.com/elixirhub/datich.git
```


## Command line utilization

```Shell
node datich.js --logs=main,result http://elixir-europe.org/events
```

See the library for the available options.


## Library utilization

```Javascript
var datich = require('datich');

...

var result = datich(html);
```

### datich(html[, options])

* `html` String
* `options` Object
  * `options.logs.main` Show the main logs.
  * `options.logs.result` Show the result in a pleasant way.
  * `options.logs.json` If `options.logs.result` is set, show the result in
    JSON.

## License

Datich is licensed under the MIT license.
