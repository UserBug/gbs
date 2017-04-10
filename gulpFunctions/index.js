const gulpFunctions = {
  buildSrc: require('./buildSrc'),
  buildCss: require('./buildCss'),
  delOldFolders: require('./delOldFolders'),
  createBundles: require('./createBundles'),
  jsDetectErrors: require('./jsDetectErrors'),
  buildLibBundle: require('./buildLibBundle'),
  uglifyLibBundle: require('./uglifyLibBundle'),
  findUsedModules: require('./findUsedModules')
};

module.exports = gulpFunctions;