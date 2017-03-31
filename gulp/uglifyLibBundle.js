'use strict';

const gulp = require('gulp');
const path = require('path');
const uglify = require('gulp-uglify');

// todo - move to params
const rootPath = path.normalize(__dirname + '/../');
const libsBundleFileName = 'libs.js';
const bundlesDirPath = rootPath + 'bundles/';

function buildLibBundle() {
  return gulp.src(bundlesDirPath + libsBundleFileName)
    .pipe(uglify())
    .pipe(gulp.dest(bundlesDirPath));
}

module.exports = buildLibBundle;
