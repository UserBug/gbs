'use strict';

const path = require('path');
const pathExist = require('path-exists');
const entryPoints = ['ui'];

// todo - move to params
const rootPath = path.normalize(__dirname + '/../');
const entryPointsDirPath = rootPath + 'lib/';
const entryPointsFileName = rootPath + 'client.js';

function getEntries(keys) {
  keys = keys || process.argv.slice(2);
  let entriesKeys = [];
  const entries = [];
  if (!keys || !keys.length || keys[0] === '--all') {
    entriesKeys = entryPoints;
  } else {
    for (const i in keys) {
      if (keys[i].substr(0, 2) === '--') {
        keys[i] = keys[i].substr(2);
        if (entryPoints.indexOf(keys[i]) >= 0) {
          entriesKeys.push(keys[i])
        }
      }
    }
  }
  for (const i in entriesKeys) {
    if (pathExist.sync(entryPointsDirPath + entriesKeys[i] + '/' + entryPointsFileName)) {
      entries.push(entriesKeys[i]);
    }
  }
  return entries;
}

module.exports = getEntries;
