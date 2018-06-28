import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'components/index';
import Home from 'components/Home';
import Details from 'components/Details';

export default (
  <Route name="app" component={App} path="/">
    <IndexRoute component={Home} />
    <Route path="/todo/:todoId" component={Details} />
  </Route>
);
