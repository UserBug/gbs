import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import notifier from 'node-notifier';
import apiRouter from './api';
import path from 'path';
import time from './../modules/time';
import renderUI from './../ui';

const config = {
  port: 3000,
  protocol: 'http',
  domain: 'localhost'
};
const app = express();

function startExpress() {
  return new Promise((res) => {
    time.start('start server');
    let libsBundle = fs.readFileSync(path.join(__dirname, '/../../bundles/libs.js'));
    let uiBundle = fs.readFileSync(path.join(__dirname, '/../../bundles/ui.js'));

    app.get('/js/libs.js', (req, res) => res.status(200).send(libsBundle));
    app.get('/js/ui.js', (req, res) => res.status(200).send(uiBundle));

    app.on('uncaughtException', (err) =>{
      notifier.notify({
        title: err.statusCode + ' - ' + String(err),
        icon: path.join(__dirname, '/../../static/images/warning.png'),
        message: err.stack
      });
    });

    app.use(express.static(path.join(__dirname, '/../static')));
    app.use(express.static(path.join(__dirname, '/../../static')));
    app.use(bodyParser.json());
    app.use('/api', apiRouter);
    app.use('/', renderUI);

    app.use((err, req, res, next) => {
      next(err);
    });

    app.listen(config.port, function () {
      res('Express lifted on ' + config.protocol + '://' + config.domain + ':' + config.port);
    });
  })
}

export default startExpress;
