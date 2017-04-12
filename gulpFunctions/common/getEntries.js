'use strict';

const gulp = require('gulp');
const through = require('through2');

function getEntries(entryPointsFiles, keys) {
  keys = keys || process.argv.slice(2);
  console.log('entryPointsFiles ', entryPointsFiles);

  let entriesKeys = [];
  if (keys || keys.length || keys.indexOf('--all') < 0) {
    entriesKeys = keys.map(function (key) {
      return key.substr(2);
    });
  }
  console.log('entriesKeys', entriesKeys);

  const starPosition = entryPointsFiles.lastIndexOf('*');
  let removePathFromEntrieName = '';
  if (starPosition >= 0) {
    removePathFromEntrieName = entryPointsFiles.substr(0, starPosition);
  }

  return gulp.src(entryPointsFiles)
    .pipe(through.obj(function(file, enc, cb) {
      let name;
      if (removePathFromEntrieName) {
        name = file.path.replace(removePathFromEntrieName, '');
      } else {
        name = file.path.split('\\').pop().split('/').pop();
      }
      name = name.substr(0, name.lastIndexOf('.'));
      file.entrieName = name;
      console.log('name', '"' + name + '"', 'skip', entriesKeys.length && entriesKeys.indexOf(name)< 0);
      if(!entriesKeys.length || entriesKeys.indexOf(name) >= 0) {
        this.push(file);
      }
      return cb();
    }));
}

module.exports = getEntries;
