import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Reducer from './_reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';

import * as serviceWorker from './serviceWorker';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(
            Reducer,composeWithDevTools()
        )}
        >
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));


serviceWorker.unregister();
