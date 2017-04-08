'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');

/**
 * Compress bundle with library's
 * @param {string} bundlesDir
 * @param {string} libsBundleFileName
 * @returns {function}
 */
function buildLibBundle(bundlesDir, libsBundleFileName) {
  return function () {
    return gulp.src(bundlesDir + '/' + libsBundleFileName)
      .pipe(uglify())
      .pipe(gulp.dest(bundlesDir));
  }
}

module.exports = buildLibBundle;
