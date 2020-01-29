
import axios from 'axios';
import { API_URL } from '../config/constants';
export const useAction = (options) => {
  const {
    normalAction,
    action,
    url,
    method,
    reqPayload,
    payload,
    cb,
  } = options;
  return dispatch => {

    if (normalAction) {
      dispatch({ type: action, payload: payload });
      return;
    }

    const fullurl = `${API_URL}${url}`;

    let req ;

    if (method === 'post' || method === 'put'){
      req = axios[method](fullurl, reqPayload)
    } else {
      req = axios[method](fullurl)
    }
    req.then((response) => {
      // dispatch data to reducer
      dispatch({ type: action, payload: response.data || payload });
      // if callback function exists then pass the response to it and call it.
      cb && cb(response);
    })
    .catch((error) => {
      cb && cb(error, true);
    });
    
  };
};