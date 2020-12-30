import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";

import routes from "./routes";
import reducers from "./redux/reducers";

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

//const store = createStore(reducers, preloadedState, applyMiddleware(thunkMiddleware));

//For development propuse only
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, preloadedState, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

ReactDOM.hydrate(
    <Provider store={store} >
        <BrowserRouter>
            <Fragment>{renderRoutes(routes)}</Fragment>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);