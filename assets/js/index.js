/**
 * index.js: this is the entry point of our React application
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import '../css/index.css';

import App from './components/App';

const store = configureStore();

const root = (
  <Provider store={store}>
    <App>
      {routes}
    </App>
  </Provider>
);

render(
  root,
  document.getElementById('root')
);
