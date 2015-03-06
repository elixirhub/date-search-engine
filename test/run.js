/**
 * Modules dependencies
 */

var fs = require('fs');
var util = require('util');
var assert = require('assert');

var datich = require('../lib/datich.js');


/**
 * Options
 */

var datichOpts = {
  logs: []
};

for (var i = 2, c = 2; i < process.argv.length; i++) {
  if (/^--logs=/.test(process.argv[i])) {
    if (/main/.test(process.argv[i])) datichOpts.logs.push('main');
    if (/result/.test(process.argv[i])) datichOpts.logs.push('result');
    if (/json/.test(process.argv[i])) datichOpts.logs.push('json');
  }
}

var text = fs.readFileSync('../README.md');
var result1 = datich(text, datichOpts);
var result2 = JSON.parse(fs.readFileSync('./result.json'));

assert.deepEqual(result1, result2, 'these two objects are the same');
