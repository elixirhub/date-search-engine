# Datich


## How to use

```Javascript
var datich = require('datich');

var dates = datich(html);
```


## Result

```Javascript
dates [
  {
    value
    index
    isd // international standard date
  }
]
```


## Command line utilization

```Shell
node datich.js http://elixir-europe.org/events
node datich.js '20 April 2015' '21 Apr 2015'
```


## Installation

Manually:

```Shell
git clone git://github.com/elixirhub/datich.git
```


## License

Datich is licensed under the MIT license.
