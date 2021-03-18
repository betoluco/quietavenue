import { applyMiddleware, createStore } from "redux";
import ReduxThunk from"redux-thunk";

import reducers from "./reducers";
import { FETCH_STARTED } from "./actionTypes";

const initialState = {
    ALL_PROPERTIES: [],
    cities: {},
    properties: {},
    citySuggest: [],
    propertySuggest: [],
    searchInput: ""
};

const store = () => {
    const store = createStore(reducers, initialState, applyMiddleware(ReduxThunk));
    return store;
};

export default store;