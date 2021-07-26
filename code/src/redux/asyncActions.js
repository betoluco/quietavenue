import axios from"axios";

import { 
    fetchEstatesSucceeded,
    fetchEstateSucceeded,
    fetchStarted,
    fetchFailed
} from "./actions";

export const fetchEstates = (endPoint, groupId) => {
    const endPointURL = new URL("api/query/" + endPoint, "https://quietavenue.com");
    return async (dispatch) => {
        dispatch(fetchStarted());
        try {
            const response = await axios.get( endPointURL.href );
            dispatch(fetchEstatesSucceeded(dispatch, groupId, response));
        }
        catch(error) {
            dispatch(fetchFailed(error));
        }
    };
};

export const fetchEstate = (estateId) => {
    const endPointURL = new URL("api/estate/" + estateId, "https://quietavenue.com");
    return async (dispatch) => {
        dispatch(fetchStarted());
        try {
            const response = await axios.get( endPointURL.href );
            dispatch(fetchEstateSucceeded(estateId, response.data, response.status));
        }
        catch(error) {
           dispatch(fetchFailed(error));
        }
    };
};