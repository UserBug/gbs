'use strict';

const gulp = require('gulp');
const through = require('through2');
const print = require('./print');

function getEntries(entryPointsFiles, keys) {
  keys = keys || process.argv.slice(2);

  let entriesKeys = [];
  if (keys && keys.length && keys.indexOf('--all') < 0) {
    entriesKeys = keys.map(function (key) {
      return key.substr(2);
    });
    print('Create Bndles with keys:', entriesKeys.join());
  }

  const starPosition = entryPointsFiles.lastIndexOf('*');
  let removePathFromEntrieName = null;
  if (starPosition >= 0) {
    removePathFromEntrieName = [entryPointsFiles.substr(0, starPosition), entryPointsFiles.substr(starPosition + 1)];
  }

  return gulp.src(entryPointsFiles)
    .pipe(through.obj(function(file, enc, cb) {
      let name;
      if (removePathFromEntrieName) {
        name = file.path.replace(/\\/ig, '/').replace(removePathFromEntrieName[1], '');
        name = name.substr(name.lastIndexOf(removePathFromEntrieName[0]) + removePathFromEntrieName[0].length)
      } else {
        name = file.path.split('\\').pop().split('/').pop();
        name = name.substr(0, name.lastIndexOf('.'));
      }
      file.entrieName = name;

      if(!entriesKeys.length || entriesKeys.indexOf(name) >= 0) {
        this.push(file);
      }
      return cb();
    }));
}

module.exports = getEntries;
