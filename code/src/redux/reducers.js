import { 
    FETCH_PROPERTIES_SUCCEEDED,
    FETCH_FILTER_PROPERTIES_SUCCEEDED,
    FETCH_PROPERTY_SUCCEEDED,
    FETCH_SEARCH_INPUT_SUCCEDED,
    FETCH_STARTED,
    FETCH_FAILED,
    SEARCH_INPUT_CHANGED
} from "./actionTypes";

const reducers = (state, action) => {
    
    const listOfObjects = list => {
        const newList = list.map( (obj) =>{
            return {
                ...obj
            };
        });
        return newList;
    };
    
    const cities = Object.fromEntries(
        Object.entries(state.cities).map( ([key, value], i) =>{
            return [key, listOfObjects(value)];
        })
    );
            
    const properties = Object.fromEntries(
        Object.entries(state.properties).map( ([key, value], i) =>{
            if(value.hasOwnProperty("dataPoints")){
                return [
                    key,
                    {
                    ...value,
                    dataPoints:listOfObjects(value.dataPoints),
                    recodredDays:[ ...value.recodredDays ]
                    }
                ];
            }else{
                return [key, {...value}];
                
            }
        })
    );
    
    const newState = {
        ...state,
        ALL_PROPERTIES: listOfObjects(state.ALL_PROPERTIES),
        cities: cities,
        properties: properties,
        citySuggest: listOfObjects(state.citySuggest),
        propertySuggest: listOfObjects(state.propertySuggest)
    };
    
    
    switch (action.type) {
        case FETCH_PROPERTIES_SUCCEEDED: {
            
            
            return {
                ...newState,
                ALL_PROPERTIES: [...action.properties]
            };
        }
        
        case FETCH_FILTER_PROPERTIES_SUCCEEDED: {
            return {
                ...newState,
                cities: {...state.cities, [action.city]: [...action.properties]}
            };
        }
        
        case FETCH_PROPERTY_SUCCEEDED: {
            return {
                ...newState,
                properties:{...state.properties, [action.id]: action.property
                    
                }
            };
        }
        
        case FETCH_SEARCH_INPUT_SUCCEDED :{
            return {
                ...newState,
                citySuggest: [...action.suggests.citySuggest],
                propertySuggest: [...action.suggests.propertySuggest]
            };
        }
        
        case FETCH_STARTED: {
            return {
                ...newState,
                statusCode: undefined
            };
        }
        
        case FETCH_FAILED: {
            return {
                ...newState,
                statusCode: action.statusCode
            };
        }
        
        case SEARCH_INPUT_CHANGED: {
            return {
                ...newState,
                searchInputText: action.searchInputText
            };
        }
        
        default:
            return state;
    }
};

export default reducers;