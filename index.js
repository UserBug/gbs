'use strict';

const _ = require('lodash');
const gulp = require('gulp');
const sequence = require('gulp-sequence');
const gulpFunctions = require('./gulpFunctions');
const defaultConfig = require('./defaultConfig');
const checkConfig = require('./gulpFunctions/common/checkConfig');

/**
 * Gulp Build System
 * @param {{}}      config
 * @param {boolean} [config.uglifyLibBundle]
 * @param {string}  [config.entryPointsFiles]
 * @param {string}  [config.lessEntryPointsFiles]
 * @param {Array}   [config.modulesExternal]
 * @param {Array}   [config.modulesExceptions]
 * @param {RegExp}  [config.delOldFoldersIgnoreRegExp]
 * @param {string}  [config.logDir]
 * @param {string}  [config.srcDir]
 * @param {string}  [config.libDir]
 * @param {string}  [config.cssDir]
 * @param {string}  [config.bundlesDir]
 * @param {string}  [config.libsBundleFileName]
 * @param {string}  [config.modulesFileName]
 * @param {string}  [config.modulesRequiredInfoFileName]
 * @param {string}  [config.eslintDetectErrorsFileName]
 */
function setGulpTasks(config) {
  const configValidationErrors = checkConfig(defaultConfig, config);
  if (configValidationErrors.length) {
    throw new Error('GBS config errors: \n' + configValidationErrors.join('\n'));
  }
  config = _.defaultsDeep({}, config, defaultConfig);
  const modulesFilePath = config.logDir + '/' + config.modulesFileName;

  gulp.task('_delOldFolders', gulpFunctions.delOldFolders(
    config.srcDir,
    config.libDir,
    config.delOldFoldersIgnoreRegExp
  ));

  gulp.task('_detectErrors', gulpFunctions.jsDetectErrors(
    config.srcDir,
    config.libDir,
    config.logDir + '/' + config.eslintDetectErrorsFileName
  ));

  gulp.task('_createBundles', gulpFunctions.createBundles(
    config.entryPointsFiles,
    config.bundlesDir,
    modulesFilePath,
    config.modulesExternal
  ));

  gulp.task('_buildLibBundle', gulpFunctions.buildLibBundle(
    config.bundlesDir,
    config.libsBundleFileName,
    modulesFilePath,
    config.modulesExternal
  ));

  gulp.task('_uglifyLibBundle', gulpFunctions.uglifyLibBundle(
    config.bundlesDir,
    config.libsBundleFileName
  ));

  gulp.task('_findUsedModules', gulpFunctions.findUsedModules(
    config.entryPointsFiles,
    config.logDir,
    config.modulesFileName,
    config.modulesRequiredInfoFileName,
    config.modulesExternal,
    config.modulesExceptions
  ));

  gulp.task('_buildCss', gulpFunctions.buildCss(
    config.lessEntryPointsFiles,
    config.cssDir
  ));

  gulp.task('_buildSrc', gulpFunctions.buildSrc(
    config.srcDir,
    config.libDir
  ));

  gulp.task('prepare', sequence(
    '_delOldFolders',
    '_detectErrors',
    ['buildSrc', 'buildCss']
  ));

  gulp.task('buildLib', sequence(
    'prepare',
    'findUsedModules',
    '_buildLibBundle',
    config.uglifyLibBundle ? '_uglifyLibBundle' : undefined
  ));

  gulp.task('build', sequence(
    'prepare',
    '_createBundles'
  ));

  gulp.task('default', sequence('build'));

  return gulp;
}

module.exports = {
  default: setGulpTasks,
  setGulpTasks: setGulpTasks,
  buildCss: gulpFunctions.buildCss,
  buildSrc: gulpFunctions.buildSrc,
  detectErrors: gulpFunctions.detectErrors,
  createBundles: gulpFunctions.createBundles,
  findUsedModules: gulpFunctions.findUsedModules,
};
