const _ = require('lodash');
const gulp = require('gulp');
const gulpFunctions = require('./gulp');
const sequence = require('gulp-sequence');
const defaultConfig = require('./defaultConfig');
const checkConfig = require('./gulp/common/checkConfig');

/**
 * Gulp Build System
 * @param {{}}      config
 * @param {{}}      [config.color]
 * @param {string}  [config.color.name]
 * @param {string}  [config.color.time]
 * @param {string}  [config.color.number]
 * @param {boolean} [config.uglifyLibBundle]
 * @param {string}  [config.entryPointsFiles]
 * @param {Array}   [config.modulesLarge]
 * @param {Array}   [config.modulesExceptions]
 * @param {RegExp}  [config.delOldFoldersIgnoreRegExp]
 * @param {string}  [config.logDir]
 * @param {string}  [config.srcDir]
 * @param {string}  [config.libDir]
 * @param {string}  [config.bundlesDir]
 * @param {string}  [config.libsBundleFileName]
 * @param {string}  [config.modulesFileName]
 * @param {string}  [config.modulesRequiredInfoFileName]
 * @param {string}  [config.eslintDetectErrorsFileName]
 * @constructor
 */
function GBS(config) {
  const configValidationErrors = checkConfig(defaultConfig, config);
  if (configValidationErrors.length) {
    throw new Error('GBS config errors: \n' + configValidationErrors.join('\n'));
  }
  this.config = _.defaultsDeep({}, config, defaultConfig);

  for (const functionName in gulpFunctions) {
    this[functionName] = gulpFunctions[functionName].bind(null, this.config);
  }
}

GBS.prototype.createGulp = function () {
  gulp.task('_delOldFolders', this.delOldFolders);
  gulp.task('_detectErrors', this.jsDetectErrors);
  gulp.task('_createBundles', this.createBundles);
  gulp.task('_buildLibBundle', this.buildLibBundle);
  gulp.task('_uglifyLibBundle', this.uglifyLibBundle);
  gulp.task('_findUsedModules', this.findUsedModules);

  gulp.task('buildCss', this.buildCss);
  gulp.task('buildSrc', this.buildSrc);

  gulp.task('prepare', sequence(
    '_delOldFolders',
    '_detectErrors',
    ['buildSrc', 'buildCss']
  ));

  gulp.task('buildLib', sequence(
    'prepare',
    '_findUsedModules',
    '_buildLibBundle',
    this.config.uglifyLibBundle ? '_uglifyLibBundle' : undefined
  ));

  gulp.task('build', sequence(
    'prepare',
    '_createBundles'
  ));

  gulp.task('default', sequence('build'));

  return gulp;
};

module.exports = GBS;
