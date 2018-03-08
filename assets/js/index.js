import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import '../css/index.css';
import Container from './components/Container';
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
    <Container>
      <Home />
    </Container>
  </Provider>,
  document.getElementById('root')
);
