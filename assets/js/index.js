import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Import css files here
import Home from './components/Home';
import reducers from './reducers';

// Create redux store
const store = createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
);

// Render the root element
render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
);
