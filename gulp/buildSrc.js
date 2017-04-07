'use strict';

const gulp = require('gulp');
const merge = require('merge-stream');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const count = require('gulp-count');

function buildSrc(config) {
  const copyJs = gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(changed('lib', {hasChanged: function(stream, cb, sourceFile, destPath) {
      changed.compareLastModifiedTime(stream, cb, sourceFile,
        destPath.slice(-4) === '.jsx' ? destPath.slice(0, -1) : destPath
      );
    }}))
    .pipe(count('babel transplit ## files'))
    .pipe(babel())
    .pipe(gulp.dest('lib'));

  const copyJson = gulp.src('src/**/*.json')
    .pipe(gulp.dest('lib'));

  return merge(copyJs, copyJson);
}

module.exports = buildSrc;
