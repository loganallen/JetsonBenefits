/**
 * index.js: This module defines the root reducer for redux. Add as many reducers as needed
 * to help separate functionality. Create different reducers for different urls potentially.
 */

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({
  app: mainReducer,
  routing: routerReducer
});

export default rootReducer;
