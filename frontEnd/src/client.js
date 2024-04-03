import React, { Fragment } from "react";
import { hydrateRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import estatesReducer from './estatesReducer';
import playerReducer from './playerReducer';
import routes from "./routes";
import "./style.css";

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = configureStore({
  reducer:{
    estates: estatesReducer,
    player: playerReducer
  },
  preloadedState
});

const browserRouter = createBrowserRouter(routes);

hydrateRoot(
  document.querySelector('#root'),
  <Provider store={store} >
    <React.StrictMode>
      <RouterProvider router={browserRouter} />
    </React.StrictMode>
  </Provider>
  
);