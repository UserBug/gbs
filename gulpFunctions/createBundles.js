'use strict';

const gulp = require('gulp');
const path = require('path');
const chalk = require('chalk');
const merge = require('merge-stream');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

const getEntries = require('./common/getEntries');
const print = require('./common/print');

/**
 * Create bundle from entry point
 * @param {string}  entryName
 * @param {string}  entryPath
 * @param {string}  bundlesDir
 * @param {Array}   [modules]
 * @returns {*}
 */
function createBundle(entryName, entryPath, bundlesDir, modules) {
  print('CreateBn', entryName);
  return browserify(entryPath)
    .external(modules || [])
    .bundle()
    .pipe(source(entryName + '.js'))
    .pipe(gulp.dest(bundlesDir));
}

/**
 * Create bundles from entry points
 * @param {string}    entryPointsFiles
 * @param {string}    bundlesDir
 * @param {string}    modulesFilePath
 * @param {Array}     modulesExternal
 * @returns {*}
 */
function createBundles(entryPointsFiles, bundlesDir, modulesFilePath, modulesExternal) {
  modulesExternal = modulesExternal || [];

  return function () {
    const modules = modulesFilePath ? require(path.normalize(modulesFilePath)) : [];
    const entries = getEntries(entryPointsFiles);
    const streams = [];
    const entriesCount = Object.keys(entries).length;

    print('Create ' + chalk.magenta(entriesCount + ' bundles'));
    if (entriesCount) {
      for (const entryName in entries) {
        streams.push(createBundle(
          entryName, entries[entryName], bundlesDir, modules.concat(modulesExternal)
        ));
      }
      return merge.apply(null, streams);
    }
  }
}

module.exports = createBundles;