import React from 'react';
import {Route, Redirect} from 'react-router';
import App from './layout/App';
import CompareContent from '../pages/CompareContent';
import CompareFiles from '../pages/CompareFiles';
import Error404 from '../pages/error/Error404';

const routes = (
  <Route component={App} >
    <Redirect from="/" to="/compare_on_client" />
    <Route path="/compare_on_client" name="compare_on_client" component={CompareContent}/>
    <Route path="/compare_on_server" name="compare_on_server" component={CompareFiles}/>
    <Route status={404} path="*" component={Error404} />
  </Route>
);

export {
  routes,
  routes as default
};
