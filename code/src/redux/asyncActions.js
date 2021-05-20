import axios from"axios";

import { 
    fetchPropertiesSucceeded,
    fetchFilterPropertiesSucceeded,
    fetchPropertySucceeded,
    fetchSearchInputSucceded,
    fetchStarted,
    fetchFailed,
    searchInputChanged
} from "./actions";

const api = "https://quietavenue.com/api/";

export const fetchProperties = () => { 
    return async (dispatch) => {
        dispatch(fetchStarted());
        try {
            const response = await axios.get( api + "all" );
            dispatch(fetchPropertiesSucceeded(response.data));
        }
        catch(error) {
            dispatch(fetchFailed(error));
        }
    };
};

export const fetchFilteredProperties = (city) => { 
    return async (dispatch) => {
        dispatch(fetchStarted());
        try {
            const response = await axios.get( api + "filter?city=" + city );
            dispatch(fetchFilterPropertiesSucceeded(response.data, city));
        }
        catch(error) {
            dispatch(fetchFailed(error));
        }
    };
};

export const fetchProperty = (id) => {
    return async (dispatch) => {
        dispatch(fetchStarted());
        try {
            const response = await axios.get(api + "property/" + id );
            if (response.data.hasOwnProperty("graphDataLink")) {
                const graphData = await axios.get(response.data.graphDataLink);
                response.data.dataPoints = graphData.data;
            }
            
            dispatch(fetchPropertySucceeded(response.data, id));
        }
        catch(error) {
           dispatch(fetchFailed(error));
        }
    };
};

export const fetchSearchInput = (text) =>{
    return async (dispatch) => {
        dispatch(fetchStarted());
        dispatch(searchInputChanged(text));
        try {
            const response = await axios.get( api + "search?search=" + text );
            dispatch(fetchSearchInputSucceded(response.data));
        }
        catch(error) {
            dispatch(fetchFailed(error));
        }
    };
};