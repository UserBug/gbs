'use strict';

const gulp = require('gulp');
const path = require('path');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

/**
 * Join npm modules to single bundle
 * @param {string}    bundlesDir
 * @param {string}    libsBundleFileName
 * @param {string}    [modulesFilePath]
 * @param {string[]}  [modulesExternal]
 * @returns {function}
 */
function buildLibBundle(bundlesDir, libsBundleFileName, modulesFilePath, modulesExternal) {
  return function () {
    const modules = modulesFilePath ? require(path.resolve(modulesFilePath)) : [];
    return browserify()
      .external(modulesExternal || [])
      .require(modules)
      .bundle()
      .pipe(source(libsBundleFileName))
      .pipe(gulp.dest(bundlesDir));
  }
}

module.exports = buildLibBundle;
