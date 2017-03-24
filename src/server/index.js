import 'babel-polyfill';
import path from 'path';
import chalk from 'chalk';
import gutil from 'gulp-util';
import notifier from 'node-notifier';
import prettyTime from 'pretty-hrtime';
import startExpress from './express';

process.on('SIGINT', () => {
  process.exit();
});

function riseError(err) {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || String(err);
  notifier.notify({
    title: statusCode + ' - ' + errorMessage,
    icon: path.join(__dirname, '/../../static/images/warning.png'),
    message: err.stack
  });
  console.error(err.stack); // eslint-disable-line no-console
}

async function watch(name, fn) {
  gutil.log('Starting \'' + chalk.cyan(name) + '\'...');
  let time = process.hrtime();
  let result;
  try {
    result = await fn();
  } catch (err) {
    riseError(err);
  }
  gutil.log('Finished \'' + chalk.cyan(name) + '\' after ' + chalk.magenta(prettyTime(process.hrtime(time))));
  return result;
}

let expressMessage = '';
watch('Lifted', () => {
  return Promise.all([
    watch('express', async function () {
      expressMessage = await startExpress();
    })
  ]);
}).then(()=>{
  notifier.notify({
    title: expressMessage,
    icon: path.join(__dirname, '/../../static/images/ok.png'),
    message: 'ok'
  });
  console.log(expressMessage); // eslint-disable-line no-console
});
