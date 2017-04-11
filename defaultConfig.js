'use strict';

/**
 * Default Config of GBS
 * @type {{
 *  uglifyLibBundle: boolean,
 *  entryPointsFiles: string,
 *  lessEntryPointsFiles: string,
 *  modulesExternal: Array,
 *  modulesExceptions: Array,
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
  uglifyLibBundle: false,
  entryPointsFiles: '/lib/*/client.js',
  lessEntryPointsFiles: '/src/static/css/*.less',
  modulesExternal: [],
  modulesExceptions: [],
  delOldFoldersIgnoreRegExp: /[\/\\]static([\/\\]|$)/ig,

  logDir: '/logs/gbs',
  srcDir: '/src',
  libDir: '/lib',
  cssDir: '/lib/static/css/',
  bundlesDir: '/lib/bundles',

  libsBundleFileName: 'libs.js',
  modulesFileName: 'modules.json',
  modulesRequiredInfoFileName: 'modulesRequiredBy.json',
  eslintDetectErrorsFileName: 'eslintDetectErrorsLog.json',
};

module.exports = defaultConfig;
