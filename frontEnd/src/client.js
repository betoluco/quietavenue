import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import estatesReducer from './estatesReducer';
import routes from "./routes";
import "./style.css";

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = configureStore({
  reducer:{
    estates: estatesReducer
  },
  preloadedState
});

const browserRouter = createBrowserRouter(routes);

ReactDOM.hydrate(
  <Provider store={store} >
    <React.StrictMode>
      <RouterProvider router={browserRouter} />
    </React.StrictMode>
  </Provider>,
  document.querySelector('#root')
);