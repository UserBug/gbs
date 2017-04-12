'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const changed = require('gulp-changed');

function getLocalPath(srcDir, filePath) {
  return filePath.substr(filePath.lastIndexOf(srcDir) + srcDir.length);
}

/**
 * Get object with previous eslint errors
 * @param {string} [eslintDetectErrorsFilePath]
 * @returns {{}|null}
 */
function getPreviousErrors(eslintDetectErrorsFilePath) {
  let previousErrors = null;

  if (eslintDetectErrorsFilePath) {
    try {
      previousErrors = fs.readFileSync(eslintDetectErrorsFilePath);
      if (previousErrors) {
        previousErrors = JSON.parse(previousErrors);
      }
    } catch (err) {}

    if (previousErrors && !previousErrors.files) {
      previousErrors = null;
    }
  }

  return previousErrors;
}

/**
 * Write log file "eslintDetectErrorsLog.json" with eslint errors
 * @param {string}            srcDir
 * @param {string|undefined}  eslintDetectErrorsFilePath
 * @param {Array}             eslintResults
 */
function writeErrorsLog(srcDir, eslintDetectErrorsFilePath, eslintResults) {
  if (eslintDetectErrorsFilePath) {
    const files = {};
    let i;
    for (i in eslintResults) {
      if (eslintResults[i].messages && eslintResults[i].messages.length) {
        files[getLocalPath(srcDir, eslintResults[i].filePath)] = eslintResults[i].messages;
      }
    }
    mkdirp.sync(eslintDetectErrorsFilePath.substring(0, eslintDetectErrorsFilePath.lastIndexOf('/')));
    fs.writeFileSync(eslintDetectErrorsFilePath, JSON.stringify({
      files: files,
      date: (new Date()).toString()
    }, null, 2))
  }
}

/**
 * This file need to ignore and leave in libDir
 * @param {{}|null}     previousErrors
 * @param {Array}       previousErrors.files
 * @param {string}      srcDir
 * @param {{}}          stream
 * @param {function}    stream.push
 * @param {function}    cb
 * @param {{}}          sourceFile
 * @param {string}      sourceFile.path
 * @param {string}      destPath
 * @returns {*}
 */
function needDetectErrorsInFile(previousErrors, srcDir, stream, cb, sourceFile, destPath) {
  const filePath = getLocalPath(srcDir, sourceFile.path);
  if (!previousErrors || filePath in previousErrors.files) {
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
  getPreviousErrors: getPreviousErrors,
  writeErrorsLog: writeErrorsLog
};
