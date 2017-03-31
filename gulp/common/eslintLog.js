'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var changed = require('gulp-changed');
var pathExists = require('path-exists');
var rootPath = path.normalize(__dirname + '/../');
var logPath = path.normalize(rootPath + '/logs');
var logFileName = 'eslintDetectErrorsLog.json';
var previousErrors;

try {
  previousErrors = fs.readFileSync(logPath);
  if (previousErrors) {
    previousErrors = JSON.parse(previousErrors);
  }
} catch (e) {
  previousErrors = null;
}

if (previousErrors && !previousErrors.files) {
  previousErrors = null;
}

function getLocalPath(path) {
  return path.replace(rootPath, '');
}

function writeErrorsLog(eslintResults) {
  var files = {};
  var i;
  for (i in eslintResults) {
    if (eslintResults[i].messages && eslintResults[i].messages.length) {
      files[getLocalPath(eslintResults[i].filePath)] = eslintResults[i].messages;
    }
  }
  if (!pathExists.sync(logPath)) {
    mkdirp.sync(logPath)
  }
  fs.writeFileSync(logPath + '/' + logFileName, JSON.stringify({
    files: files,
    date: (new Date()).toString()
  }, null, 2))
}

function needDetectErrorsInFile(stream, cb, sourceFile, destPath) {
  var srcPath = sourceFile.path;
  if (!previousErrors || getLocalPath(srcPath) in previousErrors.files) {
    stream.push(sourceFile);
    cb();
  } else {
    changed.compareLastModifiedTime(stream, cb, sourceFile,
      destPath.slice(-4) === '.jsx' ? destPath.slice(0, -1) : destPath
    );
  }
}

module.exports = {
  needDetectErrorsInFile: needDetectErrorsInFile,
  writeErrorsLog: writeErrorsLog
};
