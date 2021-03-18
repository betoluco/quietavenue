import { 
    FETCH_PROPERTIES_SUCCEEDED,
    FETCH_FILTER_PROPERTIES_SUCCEEDED,
    FETCH_PROPERTY_SUCCEEDED,
    FETCH_SEARCH_INPUT_SUCCEDED,
    FETCH_STARTED,
    FETCH_FAILED,
    INPUT_CHANGED
} from "./actionTypes";


export const fetchPropertiesSucceeded = (properties) => {
    return {
      type: FETCH_PROPERTIES_SUCCEEDED,
      properties:properties,
    };
};

export const fetchFilterPropertiesSucceeded = (properties, city) => {
    return {
      type: FETCH_FILTER_PROPERTIES_SUCCEEDED,
      properties:properties,
      city: city
    };
};

export const fetchPropertySucceeded = (property, id) => {
    return {
      type: FETCH_PROPERTY_SUCCEEDED,
      property: property,
      id: id
    };
};

export const fetchSearchInputSucceded = (suggests) => {
    return {
        type: FETCH_SEARCH_INPUT_SUCCEDED,
        suggests: suggests
    }
}

export const fetchStarted = () => {
    return { type: FETCH_STARTED };
};

export const fetchFailed = (error) => {
    if (error.hasOwnProperty("response")) {
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

export const inputChanged = text => {
    return {
        type: INPUT_CHANGED,
        text: text
    };
};