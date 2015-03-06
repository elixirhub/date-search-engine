# Datich

## Purpose

A node.js module for searching dates and times, and converting them into an
international format.


## Support

##### Numeric dates

###### Separators of the components:

* "/" slash
* "." dot
* " " space
* "-" dash
* "–" en-dash (U+2013; vim digraph Ctrl+K - N)
* "—" em-dash (U+2015; vim digraph Ctrl+K - M)

Separators may be preceded of followed by one space.

###### Support

Order:
* Little-endian (day, month, year)
* Middle-endian (month, day, year)
* Big-endian (year, month, day)

Year, month and day:
* Two-digit year
* One-digit month
* One-digit day

###### Examples

Order:
* 20/04/2015 (Little-endian)
* 04 / 20 / 2015 (Middle-endian)
* 2015-04-20 (Big-endian)

Year, month and day:
* 14-14-23 (Two-digit year)
* 15/3/2015 (One-digit month)
* 3/9/2015 (One-digit day)

Default:
* 04/05/2015 (Gives 2015-05-04)
* 04/05/06 (Gives 2006-05-04)


##### Dates with letters

###### Support

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

###### Examples

Order:
* 17 January 2015 (Little-endian)
* January 17 2015 (Middle-endian)
* 2015 January 17 (Big-endian)

Day:
* the Fourteenth of July, 2014 (Day in full letters)
* July the fourteenth, 2014 (Day in full letters)
* July 14th, 2014 (Day in both numbers and letters)
* 2010 January 05 (Day in number)
* 5 January 2010 (One-digit day)

Month:
* 5th January 2014 (Month in long form letters)
* 5 Jan 2015 (Month in short form letters)

Other:
* 2014 jan 5 (Case-insensitive search)


##### From-to dates

###### Support

* Day name (e.g. Saterday)
* 

###### Examples


## Installation

Manually:

```Shell
git clone git://github.com/elixirhub/datich.git
```


## Command line utilization

```Shell
```

## Library utilization

```Javascript
```

## License

Datich is licensed under the MIT license.
