'use strict';

var gulp = require('gulp');
var path = require('path');
var chalk = require('chalk');
var merge = require('merge-stream');
var print = require('./common/print');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var getEntries = require('./common/getEntries');
var modulesLarge = require('./common/modulesLarge.json');
var rootPath = path.normalize(__dirname + '/../');

function createBundle(entry) {
  var modules = require('./common/modules.json');
  print('CreateBn', entry);
  var createBundle = browserify(rootPath + 'lib/' + entry + '/client.js')
    .external(modules)
    .external(modulesLarge)
    .bundle()
    .pipe(source(entry + '.js'))
    .pipe(gulp.dest('bundles/'));

  return createBundle;
}

function createBundles() {
  var entries = getEntries();
  var streams = [];
  print('Create ' + chalk.magenta(entries.length) + ' bundles');
  if (entries.length) {
    for (var i in entries) {
      streams.push(createBundle(entries[i]));
    }
    return merge.apply(null, streams);
  }
}

module.exports = createBundles;
