import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import '../css/index.css';

import App from './components/App';
import Home from './components/Home';

const store = configureStore();
const history = syncHistoryWithStore(createBrowserHistory(), store);
console.log('start');

const root = (
  <Provider store={store}>
    {/* <Router history={history} routes={routes} /> */}
    <App><Home/></App>
  </Provider>
);

render(
  root,
  document.getElementById('root')
);
