'use strict';

const _ = require('lodash');
const path = require('path');
const fs = require('fs-promise');
const count = require('gulp-count');
const mdeps = require('module-deps');
const through = require('through2');
const browserResolve = require('browser-resolve');
const getEntries = require('./common/getEntries');

/**
 * Find used in bundles modules and print info to
 * @param {string} entryPointsFiles
 * @param {string} logDir
 * @param {string} modulesFileName
 * @param {string} [modulesRequiredInfoFileName]
 * @param {Array}  [modulesDontMoveToLibBundle]
 * @returns {function}
 */
function findUsedModules(
  entryPointsFiles,
  logDir,
  modulesFileName,
  modulesRequiredInfoFileName,
  modulesDontMoveToLibBundle
) {
  return function () {
    const modules = [];
    const modulesRequiredInfo = {};
    modulesDontMoveToLibBundle = modulesDontMoveToLibBundle || [];
    const rootPath = path.normalize('/');
    const pattern = path.sep === '/' ? /\/node_modules\// : /\\node_modules\\/;

    const stream = getEntries(entryPointsFiles, ['--all'])
      .pipe(through.obj(function(file, enc, cb) {
        return cb(null, file.path);
      }))
      .pipe(count('Search in ## bundles'))
      .pipe(mdeps({
        postFilter: function (id, filePath) {
          if (filePath && pattern.test(String(filePath))) {
            if (
              modules.indexOf(id) < 0 &&
              modulesDontMoveToLibBundle.indexOf(id) < 0
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
      }));

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

    return stream;
  }
}

module.exports = findUsedModules;
