'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const count = require('gulp-count');
const merge = require('merge-stream');
const changed = require('gulp-changed');

/**
 * Transplit files to ES5 using Babel
 * @param {string}    srcDir
 * @param {string}    libDir
 * @returns {function}
 */
function buildSrc(srcDir, libDir) {
  return function () {
    const copyJs = gulp.src([srcDir + '/**/*.js', srcDir + '/**/*.jsx'])
      .pipe(changed(libDir, {hasChanged: function(stream, cb, sourceFile, destPath) {
        changed.compareLastModifiedTime(stream, cb, sourceFile,
          destPath.slice(-4) === '.jsx' ? destPath.slice(0, -1) : destPath
        );
      }}))
      .pipe(count('babel transplit ## files'))
      .pipe(babel({
        plugins: ['transform-class-properties', 'transform-runtime'],
        presets: ['es2015', 'stage-0', 'react']
      }))
      .pipe(gulp.dest(libDir));

    const copyJson = gulp.src(srcDir + '/**/*.json')
      .pipe(gulp.dest(libDir));

    return merge(copyJs, copyJson);
  }
}

module.exports = buildSrc;
