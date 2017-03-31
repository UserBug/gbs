'use strict';

const pathExists = require('path-exists');
const gulp = require('gulp');
const del = require('del');
const changed = require('gulp-changed');
const count = require('gulp-count');
const through = require('through2');

// todo - move ignoreStr to params

function ignoreFiles(stream, cb, sourceFile, destPath) {
  const ignoreStr = '/static';
  if (sourceFile.path.indexOf(ignoreStr + '/') >= 0 || sourceFile.path.substr(- ignoreStr.length) === ignoreStr) {
    return cb();
  }

  pathExists(destPath).then(function(res) {
    if (!res) {
      stream.push(sourceFile);
    }
    cb();
  }).catch(function(err) {
    stream.emit('error', err);
    cb();
  });
}

function delOldFolders() {
  const pathArr = [];
  return gulp.src(['lib/**/*.js', 'lib/**/*.json', 'lib/**/*.dot', 'lib/**'])
    .pipe(changed('src', {hasChanged: ignoreFiles}))
    .pipe(count('delete ## old objects'))
    .pipe(through.obj(function(file, enc, cb) {
      pathArr.push(file.path);
      return cb(null, file);
    }, function(cb) {
      del(pathArr).then(cb.bind(null, null)).catch(cb);
    }));
}

module.exports = delOldFolders;
