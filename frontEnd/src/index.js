//Index only for development purpose
import React, {Fragment} from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import { setupStore } from './store'
import routes from "./routes";
import "./style.css";

const store = setupStore();

const browserRouter =  createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store} >
    <React.StrictMode>
        <RouterProvider router={browserRouter} />
    </React.StrictMode>
  </Provider>
);