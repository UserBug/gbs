'use strict';

var _ = require('lodash');
var fs = require('fs-promise');
var path = require('path');
var mdeps = require('module-deps');
var browserResolve = require('browser-resolve');
var getEntries = require('./common/getEntries');
var print = require('./common/print');
var chalk = require('chalk');
var rootPath = path.normalize(__dirname + '/../');
var projectRootPath = path.normalize(__dirname + '/../');
var modulesFilePath = path.normalize(__dirname + '/common/modules.json');
var modulesLarge = require('./common/modulesLarge.json');
var modulesRequiredInfoPath = path.normalize(__dirname + '/common/modulesRequiredBy.json');
var modulesExceptions = require('./common/modulesExceptions.json');

function findUsedModules() {
  var modules = [];
  var modulesRequiredInfo = {};
  var entries = getEntries(['--all']);
  print('Search in ' + chalk.magenta(entries.length) + ' bundles');

  var stream = mdeps({
    postFilter: function (id, filePath) {
      var pattern = path.sep === '/' ? /\/node_modules\// : /\\node_modules\\/;
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
      if (id.indexOf(projectRootPath) < 0) {
        const parentFile = parent.filename.replace(projectRootPath, '');
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
    stream.write(path.normalize(rootPath + 'lib/' + entries[i] + '/client.js'))
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
