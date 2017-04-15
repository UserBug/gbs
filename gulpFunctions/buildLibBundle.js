'use strict';

const _ = require('lodash');
const gulp = require('gulp');
const path = require('path');
const browserify = require('browserify');
const globalShim = require('browserify-global-shim');
const source = require('vinyl-source-stream');

/**
 * Join npm modules to single bundle
 * @param {string}    bundlesDir
 * @param {string}    libsBundleFileName
 * @param {string}    [modulesFilePath]
 * @param {string[]}  [modulesShim]
 * @returns {function}
 */
function createLibBundle(bundlesDir, libsBundleFileName, modulesFilePath, modulesShim) {
  modulesShim = modulesShim || {};
  const shim = globalShim.configure(modulesShim);

  const modulesShimNames = Object.keys(modulesShim);
  return function () {
    const modules = modulesFilePath ? require(path.resolve(modulesFilePath)) : [];
    _.pullAll(modules, modulesShimNames);

    return browserify()
      .require(modules)
      .transform(shim)
      .bundle()
      .pipe(source(libsBundleFileName))
      .pipe(gulp.dest(bundlesDir));
  }
}

module.exports = createLibBundle;
