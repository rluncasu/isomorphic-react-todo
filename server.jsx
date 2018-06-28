import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from './shared/routes';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import fetchComponentData from 'lib/fetchComponentData';
import { createStore, combineReducers } from 'redux';
import path from 'path';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
}

app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  const location = createLocation(req.url);

  const reducer = combineReducers(reducers);

  const store = createStore(reducer);
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (redirectLocation) {
      const location = redirectLocation.pathname + redirectLocation.search;
      return res.redirect(302, location);
    }

    if (!renderProps) return res.status(404).end('Not found');

    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );
      const componentHTML = renderToString(InitialView);

      const initialState = {todos:['item1','item2']};

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Aplicatii Isomorfice ReactJs</title>
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      // after the data has been fetched from the server, we can render our HTML
      .then(renderView)
      // writing the HTML to the server response
      .then(html => res.end(html))
      // in case of an error, output error message
      .catch(err => res.end(err.message));
  });
});

export default app;
