import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import routes from 'routes';
import immutifyState from 'lib/immutifyState';
import { createStore, combineReducers } from 'redux';

require('./main.css');

const initialState = immutifyState(window.__INITIAL_STATE__);

const history = createBrowserHistory();

const reducer = combineReducers(reducers);

const store = createStore(reducer, initialState);

// [routes] are defined externaly in [routes.jsx]
render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);
