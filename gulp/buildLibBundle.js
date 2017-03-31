'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var modulesLarge = require('./common/modulesLarge.json');

function buildLibBundle() {
  var modules = require('./common/modules.json');
  return browserify()
    .external(modulesLarge)
    .require(modules)
    .bundle()
    .pipe(source('libs.js'))
    .pipe(gulp.dest('./bundles/'));
}

module.exports = buildLibBundle;
