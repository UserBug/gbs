'use strict';

const gulp = require('gulp');
const path = require('path');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

/**
 * Join npm modules to single bundle
 * @param {{}}        config
 * @param {string}    config.logDir
 * @param {string}    config.bundlesDir
 * @param {string[]}  [config.modulesExternal]
 * @param {string}    [config.libsBundleFileName]
 * @returns {*}
 */
function buildLibBundle(config) {
  const libsBundleFileName = config.libsBundleFileName || 'libs.js';
  const modulesFilePath = path.normalize(config.logDir + '/modules.json');
  const modules = require(modulesFilePath);

  return browserify()
    .external(config.modulesExternal || [])
    .require(modules)
    .bundle()
    .pipe(source(libsBundleFileName))
    .pipe(gulp.dest(config.bundlesDir));
}

module.exports = buildLibBundle;
