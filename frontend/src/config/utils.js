import Store from "./store";
import { API_URL } from './constants';
const querystring = require('querystring');

// util function to sort array of objects based on attribute value
 export const getUserToken = () => {
  return window.localStorage.getItem('token');
 };

