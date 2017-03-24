'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var modules = require('./common/modules.json');
var babel = require('gulp-babel');
var modulesLarge = require('./common/modulesLarge.json');

function buildLibBundle() {
  return browserify()
    .external(modulesLarge)
    .require(modules)
    .bundle()
    .pipe(source('libs.js'))
    .pipe(gulp.dest('./bundles/'));
}

module.exports = buildLibBundle;
