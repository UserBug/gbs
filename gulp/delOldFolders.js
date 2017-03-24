'use strict';

var pathExists = require('path-exists');
var gulp = require('gulp');
var del = require('del');
var changed = require('gulp-changed');
var count = require('gulp-count');
var through = require('through2');

function ignoreFiles(stream, cb, sourceFile, destPath) {
  var ignoreStr = '/static';
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
  var pathArr = [];
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
