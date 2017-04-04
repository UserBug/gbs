'use strict';

const _ = require('lodash');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs-promise');
const mdeps = require('module-deps');
const pathExists = require('path-exists');
const browserResolve = require('browser-resolve');

const getEntries = require('./common/getEntries');
const print = require('./common/print');

// todo - move to params
const color = {
  name: 'cyan',
  time: 'magenta',
  number: 'magenta',
};
const rootPath = path.normalize(__dirname + '/../');
const entryPointsDirPath = rootPath + 'lib/';
const entryPointsFileName = rootPath + 'client.js';
const modulesFilePath = path.normalize(__dirname + '/common/modules.json');
const modulesLargeFilePath = path.normalize(rootPath + '/common/modulesLarge.json');
const modulesRequiredInfoPath = path.normalize(__dirname + '/common/modulesRequiredBy.json');
const modulesExceptionsFilePath = path.normalize(rootPath + '/common/modulesExceptions.json');

function findUsedModules() {
  const modules = [];
  const modulesRequiredInfo = {};
  const entries = getEntries(['--all']);

  let modulesLarge = [];
  if (pathExists.sync(modulesLargeFilePath)) {
    modulesLarge = require(modulesLargeFilePath)
  }

  let modulesExceptions = [];
  if (pathExists.sync(modulesExceptionsFilePath)) {
    modulesLarge = require(modulesExceptionsFilePath)
  }

  print('Search in ' + chalk[color.number](entries.length) + ' bundles');

  const stream = mdeps({
    postFilter: function (id, filePath) {
      const pattern = path.sep === '/' ? /\/node_modules\// : /\\node_modules\\/;
      if (filePath && pattern.test(String(filePath))) {
        if (
          modules.indexOf(id) < 0 && modulesLarge.indexOf(id) < 0 && modulesExceptions.indexOf(id) < 0) {
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
  for (let i in entries) {
    stream.write(path.normalize(entryPointsDirPath + entries[i] + '/' + entryPointsFileName))
  }
  stream.on('end', function() {
    modules.sort();
    fs.writeFile(modulesRequiredInfoPath, JSON.stringify(_.pick(modulesRequiredInfo, modules), null, 2));
    fs.writeFileSync(modulesFilePath, JSON.stringify(modules, null, 2));
  });
  stream.end();

  return stream;
}

module.exports = findUsedModules;
