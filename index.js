'use strict';

const _ = require('lodash');
const gulpFunctions = require('./gulpFunctions');
const defaultConfig = require('./defaultConfig');
const checkConfig = require('./gulpFunctions/common/checkConfig');

/**
 * Gulp Build System
 * @param {{}}      config
 * @param {boolean} [config.uglifyLibBundle]
 * @param {boolean|string|Array} [config.uglifyBundles]
 * @param {string}  [config.entryPointsFiles]
 * @param {string}  [config.lessEntryPointsFiles]
 * @param {{}}      [config.modulesShim]
 * @param {Array}   [config.modulesDontMoveToLibBundle]
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
function setGulpTasks(gulp, config) {
  const configValidationErrors = checkConfig(defaultConfig, config);
  if (configValidationErrors.length) {
    throw new Error('GBS config errors \n' + configValidationErrors.join('\n'));
  }
  config = _.defaultsDeep({}, config, defaultConfig);
  const modulesFilePath = config.logDir + '/' + config.modulesFileName;

  const sequence = require('gulp-sequence').use(gulp);
  gulp.task('_delOldFolders', gulpFunctions.delOldFolders(
    config.srcDir,
    config.libDir,
    config.delOldFoldersIgnoreRegExp
  ));

  gulp.task('_eslintDetectErrors', gulpFunctions.eslintDetectErrors(
    config.srcDir,
    config.libDir,
    config.eslintDetectErrorsFileName ? config.logDir + '/' + config.eslintDetectErrorsFileName : null
  ));

  gulp.task('_createBundles', gulpFunctions.createBundles(
    config.entryPointsFiles,
    config.bundlesDir,
    modulesFilePath,
    config.modulesShim
  ));

  gulp.task('_buildLibBundle', gulpFunctions.buildLibBundle(
    config.bundlesDir,
    config.libsBundleFileName,
    modulesFilePath,
    config.modulesShim
  ));

  gulp.task('_uglifyLibBundle', gulpFunctions.uglifyBundles(
    config.bundlesDir,
    config.libsBundleFileName
  ));

  gulp.task('_uglifyBundles', gulpFunctions.uglifyBundles(
    config.bundlesDir,
    config.uglifyBundles,
    config.libsBundleFileName
  ));

  gulp.task('findUsedModules', gulpFunctions.findUsedModules(
    config.entryPointsFiles,
    config.logDir,
    config.modulesFileName,
    config.modulesRequiredInfoFileName,
    config.modulesDontMoveToLibBundle
  ));

  gulp.task('buildCss', gulpFunctions.buildCss(
    config.lessEntryPointsFiles,
    config.cssDir
  ));

  gulp.task('buildSrc', gulpFunctions.buildSrc(
    config.srcDir,
    config.libDir
  ));

  gulp.task('prepare', sequence(
    '_delOldFolders',
    '_eslintDetectErrors',
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
    '_createBundles',
    config.uglifyBundles ? '_uglifyBundles' : undefined
  ));

  gulp.task('default', sequence('build'));

  return gulp;
}

for (const functionName in gulpFunctions) {
  if (gulpFunctions.hasOwnProperty(functionName)) {
    setGulpTasks[functionName] = gulpFunctions[functionName];
  }
}

module.exports = setGulpTasks;
