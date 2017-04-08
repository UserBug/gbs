'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const eslint = require('gulp-eslint');
const changed = require('gulp-changed');
const count = require('gulp-count');
const eslintLog = require('./common/eslintLog');

/**
 * Has ESLint fixed the file contents
 */
function isFixed(file) {
  return file.eslint != null && file.eslint.fixed;
}

function jsDetectErrors(config) {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'], {base: './'})
    .pipe(changed('lib', {hasChanged: eslintLog.needDetectErrorsInFile}))
    .pipe(count('eslint parse ## files on errors'))
    .pipe(eslint({fix: true}))
    .pipe(eslint.results(eslintLog.writeErrorsLog))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')));
}

module.exports = jsDetectErrors;
