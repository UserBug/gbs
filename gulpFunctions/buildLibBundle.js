'use strict';

const _ = require('lodash');
const gulp = require('gulp');
const path = require('path');
const browserify = require('browserify');
const browserifyshim = require('browserify-shim');
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
    _.pullAll(modules, modulesExternal)
    console.log('buildLibBundle modules', modules);
    console.log('buildLibBundle modulesExternal', modulesExternal);
    return browserify()
      .external(modulesExternal || [])
      .require(modules)
      .transform(browserifyshim)
      .bundle()
      .pipe(source(libsBundleFileName))
      .pipe(gulp.dest(bundlesDir));
  }
}

module.exports = buildLibBundle;
