import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({
  mainState: mainReducer,
  routing: routerReducer
});

export default rootReducer;
