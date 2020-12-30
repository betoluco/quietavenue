import axios from"axios";

import { 
    fetchPropertiesSucceeded,
    fetchPropertiesFailed,
    fetchPropertySucceeded,
    propertyNotFound,
    fetchPropertyFailed
} from "./actions";

export const fetchProperties = () => { 
    return async (dispatch) => {
        try {
            const response = await axios.get(
                "https://a7etb0iz5f.execute-api.us-west-1.amazonaws.com/Prod/api/all"
            );
            dispatch(fetchPropertiesSucceeded(response.data));
        }
        catch(error) {
            dispatch(fetchPropertiesFailed(error));
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
            dispatch(fetchPropertySucceeded(response.data, id));
        }
        catch(error) {
            if (error.hasOwnProperty("response")){
                if (error.response.status == 404) {
                    dispatch(propertyNotFound());
                }
            }else{
                dispatch(fetchPropertyFailed(error));
            }
        }
    };
};