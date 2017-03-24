'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var buildSrc = require('./gulp/buildSrc');
var buildCss = require('./gulp/buildCss');
var delOldFolders = require('./gulp/delOldFolders');
var createBundles = require('./gulp/createBundles');
var jsDetectErrors = require('./gulp/jsDetectErrors');
var buildLibBundle = require('./gulp/buildLibBundle');
var uglifyLibBundle = require('./gulp/uglifyLibBundle');
var findUsedModules = require('./gulp/findUsedModules');

gulp.task('buildSrc', buildSrc);
gulp.task('buildCss', buildCss);
gulp.task('delOldFolders', delOldFolders);
gulp.task('detectErrors', jsDetectErrors);
gulp.task('createBundles', createBundles);
gulp.task('buildLibBundle', buildLibBundle);
gulp.task('uglifyLibBundle', uglifyLibBundle);
gulp.task('findUsedModules', findUsedModules);

gulp.task('prepare', sequence(
  'delOldFolders',
  'detectErrors',
  ['buildSrc', 'buildCss']
));

gulp.task('buildLib', sequence(
  'prepare',
  'findUsedModules',
  'buildLibBundle'
  //,'uglifyLibBundle'
));

gulp.task('build', sequence(
  'prepare',
  'createBundles'
));

gulp.task('default', sequence('build'));
