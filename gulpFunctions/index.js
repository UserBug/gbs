const gulpFunctions = {
  buildSrc: require('./buildSrc'),
  buildCss: require('./buildCss'),
  delOldFolders: require('./delOldFolders'),
  createBundles: require('./createBundles'),
  eslintDetectErrors: require('./eslintDetectErrors'),
  createLibBundle: require('./createLibBundle'),
  uglifyBundles: require('./uglifyBundles'),
  findUsedModules: require('./findUsedModules')
};

module.exports = gulpFunctions;
