'use strict';

const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs-promise');
const mdeps = require('module-deps');
const browserResolve = require('browser-resolve');

const getEntries = require('./common/getEntries');
const print = require('./common/print');

/**
 * Find used in bundles modules and print info to
 * @param {string} entryPointsFiles
 * @param {string} logDir
 * @param {string} modulesFileName
 * @param {string} [modulesRequiredInfoFileName]
 * @param {Array}  [modulesExternal]
 * @param {Array}  [modulesExceptions]
 * @returns {function}
 */
function findUsedModules(
  entryPointsFiles,
  logDir,
  modulesFileName,
  modulesRequiredInfoFileName,
  modulesExternal,
  modulesExceptions
) {
  return function () {
    const modules = [];
    const modulesRequiredInfo = {};
    const entries = getEntries(entryPointsFiles, ['--all']);
    const entriesCount = Object.keys(entries).length;
    modulesExternal = modulesExternal || [];
    modulesExceptions = modulesExceptions || [];

    print('Search in ' + chalk.magenta(entriesCount) + ' bundles');

    const rootPath = path.normalize('/');
    const pattern = path.sep === '/' ? /\/node_modules\// : /\\node_modules\\/;
    const stream = mdeps({
      postFilter: function (id, filePath) {
        if (filePath && pattern.test(String(filePath))) {
          if (
            modules.indexOf(id) < 0 &&
            modulesExternal.indexOf(id) < 0 &&
            modulesExceptions.indexOf(id) < 0
          ) {
            modules.push(id);
          }
          return false;
        }
        return id;
      },
      resolve: (id, parent, cb) => {
        if (id.indexOf(rootPath) < 0) {
          const parentFile = parent.filename.replace(rootPath, '');
          if (!modulesRequiredInfo[id]) {
            modulesRequiredInfo[id] = {importByFiles: [], requiredByModules: []}
          }
          if (modulesRequiredInfo[id].importByFiles.indexOf(parentFile) < 0) {
            modulesRequiredInfo[id].importByFiles.push(parentFile);
          }
        }
        return browserResolve(id, parent, cb);
      }
    });
    for (const entryName in entries) {
      stream.write(path.normalize(entries[entryName]))
    }
    stream.on('end', function() {
      modules.sort();
      if (modulesRequiredInfoFileName) {
        fs.writeFile(
          logDir + '/' + modulesRequiredInfoFileName,
          JSON.stringify(_.pick(modulesRequiredInfo, modules), null, 2)
        );
      }
      fs.writeFileSync(logDir + '/' + modulesFileName, JSON.stringify(modules, null, 2));
    });
    stream.end();

    return stream;
  }
}

module.exports = findUsedModules;
