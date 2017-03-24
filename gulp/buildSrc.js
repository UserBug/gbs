'use strict';

var gulp = require('gulp');
var merge = require('merge-stream');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var count = require('gulp-count');

function buildSrc() {
  var copyJs = gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(changed('lib', {hasChanged: function(stream, cb, sourceFile, destPath) {
      changed.compareLastModifiedTime(stream, cb, sourceFile,
        destPath.slice(-4) === '.jsx' ? destPath.slice(0, -1) : destPath
      );
    }}))
    .pipe(count('babel transplit ## files'))
    .pipe(babel())
    .pipe(gulp.dest('lib'));

  var copyJson = gulp.src('src/**/*.json')
    .pipe(gulp.dest('lib'));

  return merge(copyJs, copyJson);
}

module.exports = buildSrc;
