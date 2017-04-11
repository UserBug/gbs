'use strict';

const gulp = require('gulp');
const path = require('path');
const chalk = require('chalk');
const count = require('gulp-count');
const through = require('through2');
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
    const modules = modulesFilePath ? require(path.resolve(modulesFilePath)) : [];
    const stream = merge();
    getEntries(entryPointsFiles)
      .pipe(count('Create ## bundles'))
      .pipe(through.obj(function(file, enc, cb) {
        console.log('entry name:', file.entrieName);
        console.log('entry path:', file.path);
        stream.add(createBundle(
          file.entrieName, file.path, bundlesDir, modules.concat(modulesExternal)
        ))
        return cb(null, file.path);
      }));

    return stream;
  }
}

module.exports = createBundles;
