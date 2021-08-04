import { 
    FETCH_ESTATES_SUCCEEDED,
    FETCH_ESTATE_SUCCEEDED,
    FETCH_FAILED,
    FETCH_STARTED
} from "./actionTypes";


export const fetchEstatesSucceeded = (dispatch, groupId, response) => {
    const estatesArray = response.data.map( estate =>{
        dispatch(fetchEstateSucceeded(estate.id, estate));
        return estate.id;
    });
    
    return {
        type: FETCH_ESTATES_SUCCEEDED,
        groupId: groupId,
        data: estatesArray,
        statusCode: response.status
    };
};

export const fetchEstateSucceeded = (estateId, data, status=200) => {
    return {
      type: FETCH_ESTATE_SUCCEEDED,
      estateId: estateId,
      data: data,
      statusCode: status
    };
};

export const fetchStarted = () => {
    return { type: FETCH_STARTED };
};

export const fetchFailed = (error) => {
    if (error.response) {
        return {
            type: FETCH_FAILED,
            statusCode: error.response.status
        };
        
    } else if (error.hasOwnProperty("request")) {
        return {
            type: FETCH_FAILED,
            statusCode: 500
        };
    }else{
        console.log('Error', error.message);
    }
};

