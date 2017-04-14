const gulpFunctions = {
  buildSrc: require('./buildSrc'),
  buildCss: require('./buildCss'),
  delOldFolders: require('./delOldFolders'),
  createBundles: require('./createBundles'),
  eslintDetectErrors: require('./eslintDetectErrors'),
  buildLibBundle: require('./buildLibBundle'),
  uglifyBundles: require('./uglifyBundles'),
  findUsedModules: require('./findUsedModules')
};

module.exports = gulpFunctions;
