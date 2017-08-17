import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from './reducers/index';

//import {loadState} from '../sessionStorage';

const loggerMiddleware = createLogger();

//let persistedState=loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware,
    loggerMiddleware,
    )));

export const history = syncHistoryWithStore(hashHistory, store);

export default store;