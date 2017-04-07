/**
 * Default Config of GBS
 * @type {{
 *  color: {
 *   name: string,
 *   time: string,
 *   number: string
 *  },
 *  uglifyLibBundle: boolean,
 *  entryPointsFiles: string,
 *  modulesLarge: Array,
 *  modulesExceptions: Array,
 *  delOldFoldersIgnoreRegExp: RegExp,
 *  logDir: string,
 *  srcDir: string,
 *  libDir: string,
 *  bundlesDir: string,
 *  libsBundleFileName: string,
 *  modulesFileName: string,
 *  modulesRequiredInfoFileName: string,
 *  eslintDetectErrorsFileName: string
 * }}
 */
const defaultConfig = {
  color: {
    name: 'cyan',
    time: 'magenta',
    number: 'magenta',
  },

  uglifyLibBundle: false,
  entryPointsFiles: '/lib/*/client.js',
  modulesLarge: [],
  modulesExceptions: [],
  delOldFoldersIgnoreRegExp: /\/static/ig,

  logDir: '/log',
  srcDir: '/src',
  libDir: '/lib',
  bundlesDir: '/lib/bundles',

  libsBundleFileName: 'libs.js',
  modulesFileName: 'modules.json',
  modulesRequiredInfoFileName: 'modulesRequiredBy.json',
  eslintDetectErrorsFileName: 'eslintDetectErrorsLog.json',
};

module.exports = defaultConfig;
