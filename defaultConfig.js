'use strict';

/**
 * Default Config of GBS
 * @type {{
 *  uglifyLibBundle: boolean,
 *  uglifyBundles: boolean|string|Array,
 *  entryPointsFiles: string,
 *  lessEntryPointsFiles: string,
 *  modulesShim: {},
 *  modulesDontMoveToLibBundle: Array,
 *  delOldFoldersIgnoreRegExp: RegExp,
 *  logDir: string,
 *  srcDir: string,
 *  libDir: string,
 *  cssDir: string,
 *  bundlesDir: string,
 *  libsBundleFileName: string,
 *  modulesFileName: string,
 *  modulesRequiredInfoFileName: string,
 *  eslintDetectErrorsFileName: string
 * }}
 */
const defaultConfig = {
  uglifyBundles: false,
  uglifyLibBundle: false,
  entryPointsFiles: '/lib/*/client.js',
  lessEntryPointsFiles: '/src/static/css/*.less',
  modulesShim: {},
  modulesDontMoveToLibBundle: [],
  delOldFoldersIgnoreRegExp: /[\/\\]static([\/\\]|$)/ig,

  logDir: 'logs/build',
  srcDir: 'src',
  libDir: 'lib',
  cssDir: 'lib/static/css/',
  bundlesDir: 'lib/static/js',

  libsBundleFileName: 'libs.js',
  modulesFileName: 'modules.json',
  modulesRequiredInfoFileName: 'modulesRequiredBy.json',
  eslintDetectErrorsFileName: 'eslintDetectErrorsLog.json',
};

module.exports = defaultConfig;
