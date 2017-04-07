const defaultConfig = {
  color: {
    name: 'cyan',
    time: 'magenta',
    number: 'magenta',
  },

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
