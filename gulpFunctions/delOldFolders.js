'use strict';

const del = require('del');
const gulp = require('gulp');
const count = require('gulp-count');
const through = require('through2');
const changed = require('gulp-changed');
const pathExists = require('path-exists');

/**
 * This file need to ignore and leave in libDir
 * @param {RegExp|null} delOldFoldersIgnoreRegExp
 * @param {{}}          stream
 * @param {function}    stream.push
 * @param {function}    stream.emit
 * @param {function}    cb
 * @param {{}}          sourceFile
 * @param {string}      sourceFile.path
 * @param {string}      destPath
 * @returns {*}
 */
function ignoreFiles(delOldFoldersIgnoreRegExp, stream, cb, sourceFile, destPath) {
  if (delOldFoldersIgnoreRegExp && sourceFile.path.match(delOldFoldersIgnoreRegExp)) {
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

/**
 * Delete files and folders from libDir which not exist in srcDir
 * @param {string}            srcDir
 * @param {string}            libDir
 * @param {RegExp|undefined}  [delOldFoldersIgnoreRegExp]
 * @returns {function}
 */
function delOldFolders(srcDir, libDir, delOldFoldersIgnoreRegExp) {
  const delOldFoldersIgnoreRegExp = delOldFoldersIgnoreRegExp || null;
  const pathArr = [];
  return function () {
    return gulp.src([
      libDir + '/**/*.js',
      libDir + '/**/*.json',
      libDir + '/**/*.dot',
      libDir + '/**'
    ])
      .pipe(changed(srcDir, {hasChanged: ignoreFiles.bind(delOldFoldersIgnoreRegExp)}))
      .pipe(count('delete ## old objects'))
      .pipe(through.obj(function(file, enc, cb) {
        pathArr.push(file.path);
        return cb(null, file);
      }, function(cb) {
        del(pathArr).then(cb.bind(null, null)).catch(cb);
      }));
  }
}

module.exports = delOldFolders;
