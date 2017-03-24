import React from 'react';
import express from 'express';
import {match} from 'react-router';
import {RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import apiRouter from '../server/api';
import routes from './routes';

function throwError(res, err) {
  const status = err.status || 500;
  console.error(err.stack); // eslint-disable-line no-console
  res.status(status).send(String(err));
}

const router = new express.Router();
router.use('/api', apiRouter);
router.get('/*', (req, res) => {
  match({ routes, location: req.originalUrl }, (error, redirectLocation, props) => {
    let status = 200;
    if (error) {
      throwError(req, res, error, props);
    } else if (redirectLocation) {
      status = 302;
      res.redirect(status, redirectLocation.pathname + redirectLocation.search)
    } else if (props) {
      if (props.routes.filter(route => route.status === 404).length > 0) {
        status = 404;
      }
      try {
        res.status(status).send(('<!DOCTYPE html>' + renderToString(<RouterContext {...props}/>)));
      } catch (err) {
        throwError(res, err);
      }
    }
  })
});

export default router;
