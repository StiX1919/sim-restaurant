import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import  store from './store'

import Router from './router'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    
    <Provider store = { store }>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));