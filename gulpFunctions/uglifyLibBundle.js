'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');

/**
 * Compress bundle with library's
 * @param {{}} config
 * @param {string} config.bundlesDir
 * @param {string} config.libsBundleFileName
 * @returns {*}
 */
function buildLibBundle(config) {
  return gulp.src(config.bundlesDir + '/' + config.libsBundleFileName)
    .pipe(uglify())
    .pipe(gulp.dest(config.bundlesDir));
}

module.exports = buildLibBundle;
