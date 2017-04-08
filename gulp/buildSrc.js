'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const count = require('gulp-count');
const merge = require('merge-stream');
const changed = require('gulp-changed');

/**
 * Transplit files to ES5 using Babel
 * @param {{}}        config
 * @param {string}    config.srcDir
 * @param {string}    config.libDir
 * @returns {*}
 */
function buildSrc(config) {
  const copyJs = gulp.src([config.srcDir + '/**/*.js', config.srcDir + '/**/*.jsx'])
    .pipe(changed(config.libDir, {hasChanged: function(stream, cb, sourceFile, destPath) {
      changed.compareLastModifiedTime(stream, cb, sourceFile,
        destPath.slice(-4) === '.jsx' ? destPath.slice(0, -1) : destPath
      );
    }}))
    .pipe(count('babel transplit ## files'))
    .pipe(babel())
    .pipe(gulp.dest(config.libDir));

  const copyJson = gulp.src(config.srcDir + '/**/*.json')
    .pipe(gulp.dest(config.libDir));

  return merge(copyJs, copyJson);
}

module.exports = buildSrc;
