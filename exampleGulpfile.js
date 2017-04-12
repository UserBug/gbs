'use strict';

/*
  Example Gulp File for Your project
  How to init GBS (Gulp Build System)
 */
const gulp = require('gulp');
const setGulpTasks = require('gbs');
setGulpTasks(gulp, {
  uglifyBundles: false,
  entryPointsFiles: '/lib/ui/client.js',
  lessEntryPointsFiles: '/src/static/css/*.less',
  modulesExternal: ['react'],
  delOldFoldersIgnoreRegExp: /\/static/ig,

  logDir: '/log',
  srcDir: '/src',
  libDir: '/lib',
  cssDir: '/lib/static/css/',
  bundlesDir: '/lib/bundles'
});
