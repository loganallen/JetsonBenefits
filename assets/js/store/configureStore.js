/**
 * configureStore.js: Configures the redux store with thunk middleware (for async calls)
 */

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
  );

  return store;
}

export default configureStore;
