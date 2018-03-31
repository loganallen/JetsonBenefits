import React from 'react';
import { render } from 'react-dom';
// import { browserHistory } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import Root from './components/Root';
import '../css/index.css';

const store = configureStore();
const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
