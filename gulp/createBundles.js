'use strict';

const gulp = require('gulp');
const path = require('path');
const chalk = require('chalk');
const merge = require('merge-stream');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

const getEntries = require('./common/getEntries');
const print = require('./common/print');

// todo - move to params
const color = {
  name: 'cyan',
  time: 'magenta',
  number: 'magenta',
};
const rootPath = path.normalize(__dirname + '/../');
const entryPointsDirPath = rootPath + 'lib/';
const entryPointsFileName = rootPath + 'client.js';
const bundlesDirPath = rootPath + 'bundles/';
const modulesFilePath = path.normalize(rootPath + '/common/modules.json');
const modulesLargeFilePath = path.normalize(rootPath + '/common/modulesLarge.json');

function createBundle(entry) {
  const modules = require(modulesFilePath);
  const modulesLarge = require(modulesLargeFilePath);
  print('CreateBn', entry);
  return browserify(entryPointsDirPath + entry + '/' + entryPointsFileName)
    .external(modules)
    .external(modulesLarge)
    .bundle()
    .pipe(source(entry + '.js'))
    .pipe(gulp.dest(bundlesDirPath));
}

function createBundles() {
  const entries = getEntries();
  const streams = [];
  print('Create ' + chalk[color.number](entries.length) + ' bundles');
  if (entries.length) {
    for (let i in entries) {
      streams.push(createBundle(entries[i]));
    }
    return merge.apply(null, streams);
  }
}

module.exports = createBundles;
