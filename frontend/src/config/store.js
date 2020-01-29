import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from '../reducers';
import history from './history';

// Build the middleware for intercepting and dispatching navigation actions
const routerMiddlewareInstance = routerMiddleware(history);

const logger = createLogger();
const middleware = applyMiddleware(promise(), thunk, routerMiddlewareInstance, logger);

export default createStore(reducer, middleware);
