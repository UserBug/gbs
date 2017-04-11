'use strict';

const gulp = require('gulp');
const through = require('through2');

function getEntries(entryPointsFiles, keys) {
  const entries = {};
  console.log('entryPointsFiles ', entryPointsFiles);

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
      console.log({name: name, path: file.path});
      file._GBSEntrieName = name;
      return cb(null, file);
    }));


  console.log('entries', entries);
  throw new Error('STOP');
  return entries;
  /*
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
  */
}

module.exports = getEntries;
