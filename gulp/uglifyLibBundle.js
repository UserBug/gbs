'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');

function buildLibBundle() {
  return gulp.src('./bundles/libs.js')
    .pipe(uglify())
    .pipe(gulp.dest('./bundles'));
}

module.exports = buildLibBundle;
