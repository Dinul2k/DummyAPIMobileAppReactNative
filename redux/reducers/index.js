// index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  // your reducers will go here
  auth: authReducer,
  products: productReducer,
});

export default rootReducer;
