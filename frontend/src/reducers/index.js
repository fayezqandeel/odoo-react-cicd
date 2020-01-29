import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import PageReducer from './page-reducer';

export default combineReducers({
  routerReducer,
  PageReducer,
});
