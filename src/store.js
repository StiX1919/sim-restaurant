import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'

import reducer from './ducks/reducer';
import CCReducer from './ducks/CCReducer';
import userReducer from './ducks/userReducer'
import heroReducer from './ducks/heroReducer'
import monsterReducer from './ducks/monsterReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(
    combineReducers({reducer, CCReducer, userReducer, heroReducer, monsterReducer}), composeWithDevTools(applyMiddleware(promiseMiddleware())))