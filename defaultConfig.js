const defaultConfig = {
  color: {
    name: 'cyan',
    time: 'magenta',
    number: 'magenta',
  },

  entryPoints: [],
  modulesLarge: [],
  modulesExceptions: [],
  delOldFoldersIgnoreStr: '/static',

  path: {
    rootDir: path.normalize(__dirname + '/../'),
    entryPointsDir: 'lib/',
    bundlesDir: 'bundles/',

    modulesFile: '/common/modules.json',
    modulesRequiredInfoFile: '/common/modulesRequiredBy.json',
    eslintDetectErrorsFile: '/logs/eslintDetectErrorsLog.json'
  },

  fileName: {
    libsBundle: 'libs.js',
    entryPoints: 'client.js'
  }
};

module.exports = defaultConfig;
