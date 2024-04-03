//Index only for development purpose
import React, {Fragment} from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import estatesReducer from "./estatesReducer";
import playerReducer from './playerReducer';
import routes from "./routes";
import "./style.css";

const store = configureStore({
  reducer:{
    estates: estatesReducer,
    player: playerReducer
  }
});

const browserRouter =  createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store} >
    <React.StrictMode>
        <RouterProvider router={browserRouter} />
    </React.StrictMode>
  </Provider>
);