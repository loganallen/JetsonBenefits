import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import '../css/index.css';

const store = configureStore();
const history = syncHistoryWithStore(createBrowserHistory(), store);

const root = (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

render(
  root,
  document.getElementById('root')
);
