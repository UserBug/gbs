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
  return file.eslint !== null && file.eslint.fixed;
}

/**
 * Delete files and folders from libDir which not exist in srcDir
 * @param {string}            srcDir
 * @param {string}            libDir
 * @param {string|undefined}  [eslintDetectErrorsFilePath]
 * @returns {function}
 */
function eslintDetectErrors(srcDir, libDir, eslintDetectErrorsFilePath) {
  return function () {
    const previousErrors = eslintLog.getPreviousErrors(eslintDetectErrorsFilePath);
    return gulp.src([srcDir + '/**/*.js', srcDir + '/**/*.jsx'])
      .pipe(changed(libDir, {hasChanged: eslintLog.needDetectErrorsInFile.bind(null, previousErrors, srcDir)}))
      .pipe(eslint({fix: true}))
      .pipe(count('eslint parse ## files on errors'))
      .pipe(eslint.results(eslintLog.writeErrorsLog.bind(null, srcDir, eslintDetectErrorsFilePath)))
      .pipe(eslint.format())
      .pipe(gulpIf(isFixed, gulp.dest(srcDir)));
  }
}

module.exports = eslintDetectErrors;
