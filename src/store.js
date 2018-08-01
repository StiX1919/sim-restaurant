import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'

import reducer from './ducks/reducer';
import CCReducer from './ducks/CCReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(
    combineReducers({reducer, CCReducer}), composeWithDevTools(applyMiddleware(promiseMiddleware())))