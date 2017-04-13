'use strict';

const _ = require('lodash');
const gulp = require('gulp');
const path = require('path');
const count = require('gulp-count');
const merge = require('merge-stream');
const browserify = require('browserify');
const globalShim = require('browserify-global-shim');
const source = require('vinyl-source-stream');

const getEntries = require('./common/getEntries');
const print = require('./common/print');

/**
 * Create bundle from entry point
 * @param {string}  entryName
 * @param {string}  entryPath
 * @param {string}  bundlesDir
 * @param {Array}   [modules]
 * @param {{}}   [modulesShim]
 * @returns {*}
 */
function createBundle(entryName, entryPath, bundlesDir, modules, modulesShim) {
  print('CreateBn', entryName);
  const shim = globalShim.configure(modulesShim);
  return browserify(entryPath)
    .external(modules || [])
    .transform(shim)
    .bundle()
    .pipe(source(entryName + '.js'))
    .pipe(gulp.dest(bundlesDir));
}

/**
 * Create bundles from entry points
 * @param {string}    entryPointsFiles
 * @param {string}    bundlesDir
 * @param {string}    modulesFilePath
 * @param {Array}     modulesShim
 * @returns {*}
 */
function createBundles(entryPointsFiles, bundlesDir, modulesFilePath, modulesShim) {
  modulesShim = modulesShim || {};

  const modulesShimNames = Object.keys(modulesShim);
  return function () {
    const modules = modulesFilePath ? require(path.resolve(modulesFilePath)) : [];
    _.pullAll(modules, modulesShimNames);
    const stream = merge();
    let countEntries = 0;
    getEntries(entryPointsFiles)
      .pipe(count('Create ## bundles'))
      .on('data', function (file) {
        countEntries++;
        stream.add(createBundle(file.entrieName, file.path, bundlesDir, modules, modulesShim));
      })
      .on('end', function () {
        if (!countEntries) {
          stream.end();
        }
      });
    return stream;
  }
}

module.exports = createBundles;
