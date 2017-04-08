'use strict';

const chalk = require('chalk');
const gutil = require('gulp-util');
const prettyTime = require('pretty-hrtime');

// todo - move to params
const color = {
  name: 'cyan',
  time: 'magenta',
  number: 'magenta',
};

function print(message, name, time) {
  const str = message +
    (name ? ' \'' + chalk[color.name](name) + '\'' : '') +
    (typeof time !== 'undefined' ? ' after ' + chalk[color.time](prettyTime(time)) : '...');
  gutil.log(str);
}

module.exports = print;
