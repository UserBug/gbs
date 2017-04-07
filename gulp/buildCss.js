'use strict';

const gulp = require('gulp');
const less = require('gulp-less');

function buildCss(config) {
  return gulp.src('src/static/css/*.less')
    .pipe(less({paths: '.'}))
    .pipe(gulp.dest('lib/static/css'));
}

module.exports = buildCss;
