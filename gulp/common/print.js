'use strict';

var chalk = require('chalk');
var gutil = require('gulp-util');
var prettyTime = require('pretty-hrtime');

function print(message, name, time) {
  var str = message +
    (name ? ' \'' + chalk.cyan(name) + '\'' : '') +
    (typeof time !== 'undefined' ? ' after ' + chalk.magenta(prettyTime(time)) : '...');
  gutil.log(str);
}

module.exports = print;
