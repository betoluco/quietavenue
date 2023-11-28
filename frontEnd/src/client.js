import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import estatesReducer from './estatesReducer';
import Routes from "./Routes";
import ScrollToTop from "./ScrollToTop";
import "./style.css";

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;


const store = configureStore({
    reducer:{
        estates: estatesReducer
    },
    preloadedState
});

ReactDOM.hydrate(
    <Provider store={store} >
        <BrowserRouter>
            <ScrollToTop />
            <Fragment>{renderRoutes(Routes)}</Fragment>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);