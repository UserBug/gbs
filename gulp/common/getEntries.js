'use strict';

var pathExist = require('path-exists');
var entryPoints = ['ui'];

function getEntries(keys) {
  keys = keys || process.argv.slice(2);
  var entriesKeys = [];
  var entries = [];
  if (!keys || !keys.length || keys[0] === '--all') {
    entriesKeys = entryPoints;
  } else {
    for (var i in keys) {
      if (keys[i].substr(0, 2) === '--') {
        keys[i] = keys[i].substr(2);
        if (entryPoints.indexOf(keys[i]) >= 0) {
          entriesKeys.push(keys[i])
        }
      }
    }
  }
  for (var i in entriesKeys) {
    if (pathExist.sync(__dirname + '/../../lib/' + entriesKeys[i] + '/client.js')) {
      entries.push(entriesKeys[i]);
    }
  }
  return entries;
}

module.exports = getEntries;
