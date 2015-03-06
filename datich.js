/**
 * Modules dependencies
 */

var url = require('url');
var http = require('http');
var https = require('https');
var lib = {
  "datich": require('./lib/datich.js')
};


var datichOpts = {
  logs: []
};


for (var i = 2, c = 2; i < process.argv.length; i++) {
  (function (i) {

    if (/^--logs=/.test(process.argv[i])) {
      if (/main/.test(process.argv[i])) datichOpts.logs.push('main');
      if (/result/.test(process.argv[i])) datichOpts.logs.push('result');
      if (/json/.test(process.argv[i])) datichOpts.logs.push('json');
      return;
    }

    var urlToInspect = process.argv[i];

    (url.parse(urlToInspect).protocol === 'http:' ? http : https)
    .get(urlToInspect, function (res) {

      var htmlReceived = '';
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        htmlReceived += chunk;
      });

      res.on('end', function () {

        console.log(res.statusCode + ' - ' + urlToInspect);

        lib.datich(htmlReceived, datichOpts);

        if (++c !== process.argv.length) console.log('\n');

      });

    }).on('error', function (err) {
      console.error(err);
    });

  })(i);
}
