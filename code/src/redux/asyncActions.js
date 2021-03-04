import axios from"axios";

import { 
    fetchPropertiesSucceeded,
    propertiesNotFound,
    fetchPropertiesFailed,
    fetchPropertySucceeded,
    propertyNotFound,
    fetchPropertyFailed
} from "./actions";

export const fetchProperties = (city) => { 
    return async (dispatch) => {
        try {
            const response = await axios.get(
                "https://a7etb0iz5f.execute-api.us-west-1.amazonaws.com/Prod/api/city?city=" +
                city
            );
            
            dispatch(fetchPropertiesSucceeded(response.data, city));
        }
        catch(error) {
            if (error.hasOwnProperty("response")){
                if (error.response.status === 404) {
                    dispatch(propertiesNotFound());
                }
            }else{
                dispatch(fetchPropertiesFailed(error));
            }
        }
    };
};

export const fetchProperty = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                "https://a7etb0iz5f.execute-api.us-west-1.amazonaws.com/Prod/api/property/" + 
                id
            );
            console.log(response)
            if (response.data.graph_data !== undefined) {
                response.graph_data = await axios.get(response.graph_data);
            }
            
            dispatch(fetchPropertySucceeded(response.data, id));
        }
        catch(error) {
            if (error.hasOwnProperty("response")){
                if (error.response.status === 404) {
                    dispatch(propertyNotFound());
                }
            }else{
                dispatch(fetchPropertyFailed(error));
            }
        }
    };
};