//Index only for development purpose
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import ScrollToTop from "./ScrollToTop";
import Routes from "./Routes";
import "./style.css";
import estatesReducer from "./estatesReducer";

const store = configureStore({
    reducer:{
        estates: estatesReducer
    }
});

ReactDOM.render(
  <Provider store={store} >
        <BrowserRouter>
            <ScrollToTop />
            {renderRoutes(Routes)}
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
