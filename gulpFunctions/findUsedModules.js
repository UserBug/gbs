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
 * @param {{}}     config
 * @param {string} config.logDir
 * @param {string} config.modulesFileName
 * @param {string} config.modulesRequiredInfoFileName
 * @param {Array}  [config.modulesExternal]
 * @param {Array}  [config.modulesExceptions]
 * @param {RegExp} [config.delOldFoldersIgnoreRegExp]
 * @param {string} [config.color]
 * @param {string} [config.color.number]
 * @returns {*}
 */
function findUsedModules(config) {
  const modules = [];
  const modulesRequiredInfo = {};
  const entries = getEntries(config, ['--all']);
  const entriesCount = Object.keys(entries).length;
  const modulesExternal = config.modulesExternal || [];
  const modulesExceptions = config.modulesExceptions || [];

  print('Search in ' + chalk[config.color.number](entriesCount) + ' bundles');

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
    fs.writeFile(
      config.logDir + '/' + config.modulesRequiredInfoFileName,
      JSON.stringify(_.pick(modulesRequiredInfo, modules), null, 2)
    );
    fs.writeFileSync(config.logDir + '/' + config.modulesFileName, JSON.stringify(modules, null, 2));
  });
  stream.end();

  return stream;
}

module.exports = findUsedModules;
