import axios from"axios";

import { 
    fetchPropertiesSucceeded,
    fetchFilterPropertiesSucceeded,
    fetchPropertySucceeded,
    fetchSearchInputSucceded,
    fetchStarted,
    fetchFailed,
    inputChanged
} from "./actions";

const api = "https://a7etb0iz5f.execute-api.us-west-1.amazonaws.com/Prod/api/";

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
            console.log("response", response.data)
            if (response.data.hasOwnProperty("graphDataLink")) {
                console.log("Data Link", response.data.graphDataLink)
                const graphData = await axios.get(response.data.graphData);
                console.log(graphData.data)
                response.data.dataPoints = graphData.data.dataPoints
                response.data.recordedDays = graphData.data.recordedDays
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
        dispatch( inputChanged(text));
        try {
            const response = await axios.get( api + "search?search=" + text );
            dispatch(fetchSearchInputSucceded(response.data));
        }
        catch(error) {
            dispatch(fetchFailed(error));
        }
    };
};