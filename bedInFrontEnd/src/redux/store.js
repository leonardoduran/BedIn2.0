import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import multi from 'redux-multi';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from './reducers/index';

import { loadState } from '../sessionStorage';

const loggerMiddleware = createLogger();

const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware, multi))
);

// const store = createStore(rootReducer, composeEnhancers(
//     applyMiddleware(thunkMiddleware,
//     loggerMiddleware,
//     )));

export const history = syncHistoryWithStore(hashHistory, store);

export default store;
