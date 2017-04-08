'use strict';

const gulp = require('gulp');
const less = require('gulp-less');

/**
 * Compile less to css
 * @param {{}}      config
 * @param {string}  config.lessEntryPointsFiles
 * @param {string}  config.cssDir
 * @returns {*}
 */
function buildCss(config) {
  return gulp.src(config.lessEntryPointsFiles)
    .pipe(less({paths: '.'}))
    .pipe(gulp.dest(config.cssDir));
}

module.exports = buildCss;
