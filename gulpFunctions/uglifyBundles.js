'use strict';

const gulp = require('gulp');
const count = require('gulp-count');
const uglify = require('gulp-uglify');

function addToSRC(src, bundlesDir, bundlesNames, ignore) {
  if (bundlesNames === true) {
    src.push((ignore ? '!' : '') + bundlesDir + '/*.js');
  } else if (typeof bundlesNames === 'string') {
    src.push((ignore ? '!' : '') + bundlesDir + '/' + bundlesNames);
  } else if (bundlesNames && typeof bundlesNames === 'object') {
    for (const i in bundlesNames) {
      src.push((ignore ? '!' : '') + bundlesDir + '/' + bundlesNames[i]);
    }
  }
  return src;
}

/**
 * Compress bundle with library's
 * @param {string} bundlesDir
 * @param {string|Array} uglifyBundles
 * @param {string|Array} ignoreBundles
 * @returns {function}
 */
function uglifyBundles(bundlesDir, uglifyBundles, ignoreBundles) {
  const src = [];
  addToSRC(src, bundlesDir, uglifyBundles);
  addToSRC(src, bundlesDir, ignoreBundles, true);

  return function () {
    return gulp.src(src)
      .pipe(count('Uglify ## bundles'))
      .pipe(uglify())
      .pipe(gulp.dest(bundlesDir));
  }
}

module.exports = uglifyBundles;
