const gulpFunctions = {
  gulp: require('gulp'),
  sequence: require('gulp-sequence'),
  buildSrc: require('./gulp/buildSrc'),
  buildCss: require('./gulp/buildCss'),
  delOldFolders: require('./gulp/delOldFolders'),
  createBundles: require('./gulp/createBundles'),
  jsDetectErrors: require('./gulp/jsDetectErrors'),
  buildLibBundle: require('./gulp/buildLibBundle'),
  uglifyLibBundle: require('./gulp/uglifyLibBundle'),
  findUsedModules: require('./gulp/findUsedModules')
};

module.exports = gulpFunctions;
