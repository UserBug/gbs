'use strict';

/*
  Example Gulp File for Your project
  How to init GBS (Gulp Build System)
 */
const gulp = require('gulp');
const setGulpTasks = require('gbs');
setGulpTasks(gulp, {
  uglifyLibBundle: true,
  uglifyBundles: 'public.js',
  entryPointsFiles: 'lib/frontSections/*/client.js',
  lessEntryPointsFiles: 'src/static/css/*.less',
  modulesExternal: ['react', 'react-dom', 'react-router'],
  delOldFoldersIgnoreRegExp: /[\/\\]static([\/\\]|$)/ig,

  logDir: 'logs/build',
  srcDir: 'src',
  libDir: 'lib',
  cssDir: 'lib/static/css/',
  bundlesDir: 'lib/static/js',
  libsBundleFileName: 'libs.js'
});
