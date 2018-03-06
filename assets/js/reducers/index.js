import { combineReducers } from 'redux';
import mainReducer from './mainReducer';

const reducer = combineReducers({
  mainState: mainReducer
});

export default reducer;
