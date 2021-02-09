import { 
    FETCH_PROPERTIES_SUCCEEDED,
    PROPERTIES_NOT_FOUND,
    FETCH_PROPERTIES_FAILED,
    FETCH_PROPERTY_SUCCEEDED,
    PROPERTY_NOT_FOUND,
    FETCH_PROPERTY_FAILED
} from "./actionTypes";


export const fetchPropertiesSucceeded = (properties, city) => {
    return {
      type: FETCH_PROPERTIES_SUCCEEDED,
      properties:properties,
      city: city
    };
};

export const propertiesNotFound = () => {
    return {
      type: PROPERTIES_NOT_FOUND
    };
};

export const fetchPropertiesFailed = (error) =>{
    if (error.hasOwnProperty("response")) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.hasOwnProperty("request")) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    
    return {
        type: FETCH_PROPERTIES_FAILED
    };
};

export const fetchPropertySucceeded = (property, id) => {
    return {
      type: FETCH_PROPERTY_SUCCEEDED,
      property: property,
      id: id
    };
};

export const propertyNotFound = () => {
    return {
      type: PROPERTY_NOT_FOUND
    };
};

export const fetchPropertyFailed = (error) =>{
    if (error.hasOwnProperty("response")) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.hasOwnProperty("request")) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    
    return {
        type: FETCH_PROPERTY_FAILED
    };
};