'use strict';

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var eslint = require('gulp-eslint');
var changed = require('gulp-changed');
var count = require('gulp-count');
var eslintLog = require('./common/eslintLog');
var gulpFiles = ['gulpfile.js', 'gulp/**/*.js'];

/**
 * Has ESLint fixed the file contents
 */
function isFixed(file) {
  return file.eslint != null && file.eslint.fixed;
}

function jsDetectErrors() {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'], {base: './'})
    .pipe(changed('lib', {hasChanged: eslintLog.needDetectErrorsInFile}))
    .pipe(count('eslint parse ## files on errors'))
    .pipe(eslint({fix: true}))
    .pipe(eslint.results(eslintLog.writeErrorsLog))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')));
}

module.exports = jsDetectErrors;
