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
 * @param {Array}   [modulesExternal]
 * @returns {*}
 */
function createBundle(entryName, entryPath, bundlesDir, modules, modulesExternal) {
  modules = modules || [];
  modulesExternal = modulesExternal || [];

  print('CreateBn', entryName);
  return browserify(entryPath)
    .external(modules)
    .external(modulesExternal)
    .bundle()
    .pipe(source(entryName + '.js'))
    .pipe(gulp.dest(bundlesDir));
}

/**
 * Create bundles from entry points
 * @param {{}}        config
 * @param {string}    config.logDir
 * @param {string}    config.modulesFileName
 * @param {string}    config.bundlesDir
 * @param {Array}     config.modulesExternal
 * @param {{}}        config.color
 * @param {string}    config.color.number
 * @returns {*}
 */
function createBundles(config) {
  const modules = require(path.normalize(config.logDir + '/' + config.modulesFileName));
  const entries = getEntries(config);
  const streams = [];
  const entriesCount = Object.keys(entries).length;

  print('Create ' + chalk[config.color.number](entriesCount + ' bundles'));
  if (entriesCount) {
    for (const entryName in entries) {
      streams.push(createBundle(
        entryName, entries[entryName], config.bundlesDir, modules, config.modulesExternal
      ));
    }
    return merge.apply(null, streams);
  }
}

module.exports = createBundles;
