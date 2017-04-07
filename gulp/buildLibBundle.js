'use strict';

const gulp = require('gulp');
const path = require('path');
const browserify = require('browserify');
const pathExists = require('path-exists');
const source = require('vinyl-source-stream');

// todo - move to params
const rootPath = path.normalize(__dirname + '/../');
const modulesFilePath = path.normalize(rootPath + '/common/modules.json');
const modulesLargeFilePath = path.normalize(rootPath + '/common/modulesLarge.json');

function buildLibBundle(config) {
  const modules = require(modulesFilePath);
  let modulesLarge = [];
  if (pathExists.sync(modulesLargeFilePath)) {
    modulesLarge = require(modulesLargeFilePath);
  }
  return browserify()
    .external(modulesLarge)
    .require(modules)
    .bundle()
    .pipe(source('libs.js'))
    .pipe(gulp.dest('./bundles/'));
}

module.exports = buildLibBundle;
