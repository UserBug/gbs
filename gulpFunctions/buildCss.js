'use strict';

const gulp = require('gulp');
const less = require('gulp-less');

/**
 * Compile less to css
 * @param {string}  lessEntryPointsFiles
 * @param {string}  cssDir
 * @returns {function}
 */
function buildCss(lessEntryPointsFiles, cssDir) {
  return function () {
    return gulp.src(lessEntryPointsFiles)
      .pipe(less({paths: '.'}))
      .pipe(gulp.dest(cssDir));
  }
}

module.exports = buildCss;
