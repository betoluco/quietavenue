import { 
    FETCH_PROPERTIES_SUCCEEDED, 
    FETCH_PROPERTIES_FAILED,
    FETCH_PROPERTY_SUCCEEDED,
    PROPERTY_NOT_FOUND,
    FETCH_PROPERTY_FAILED
} from "./actionTypes";

const reducers = (state, action) => {
    switch (action.type) {
        case FETCH_PROPERTIES_SUCCEEDED: {
            return {
                ...state,
                fetchPropertiesStatus: FETCH_PROPERTIES_SUCCEEDED,
                properties: [...state.properties, ...action.properties]
            };
        }
        case FETCH_PROPERTIES_FAILED: {
            return {
                ...state,
                fetchPropertiesStatus: FETCH_PROPERTIES_FAILED
            };
        }
        case FETCH_PROPERTY_SUCCEEDED: {
            return {
                ...state,
                fetchPropertyStatus: FETCH_PROPERTY_SUCCEEDED,
                [action.id]: action.property
            };
        }
        case PROPERTY_NOT_FOUND: {
            return {
                ...state,
                fetchPropertyStatus: PROPERTY_NOT_FOUND
            };
        }
        case FETCH_PROPERTY_FAILED: {
            return {
                ...state,
                fetchPropertyStatus: FETCH_PROPERTY_FAILED
              
            };
        }
        default:
            return state;
    }
};

export default reducers;