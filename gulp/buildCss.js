'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var less = require('gulp-less');

function buildCss() {
  return gulp.src('src/static/css/*.less')
    .pipe(less({paths: '.'}))
    .pipe(gulp.dest('lib/static/css'));
}

module.exports = buildCss;
