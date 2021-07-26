import { 
    FETCH_ESTATES_SUCCEEDED,
    FETCH_ESTATE_SUCCEEDED,
    FETCH_STARTED,
    FETCH_FAILED
} from "./actionTypes";

const reducers = (state, action) => {
    function copy (obj) {
    // Get object type
        let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    
        function cloneObj () {
            let clone = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clone[key] = copy(obj[key]);
                }
            }
            return clone;
        }
    
        function cloneArr () {
            return obj.map(function (item) {
                return copy(item);
            });
        }

        if (type === 'object') return cloneObj();
        if (type === 'array') return cloneArr();
        return obj;
    }
    
    const newState = copy(state);
    
    switch (action.type) {
        case FETCH_ESTATES_SUCCEEDED: {
            return {
                ...newState,
                [action.groupId]:action.data,
                statusCode: action.statusCode
            };
        }
        
        case FETCH_ESTATE_SUCCEEDED: {
            if (!state.hasOwnProperty(action.estateId)){
                return {
                    ...newState,
                    [action.estateId]: action.data,
                    statusCode: action.statusCode
                };
            }
            return state;
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
        
        default:
            return state;
    }
};

export default reducers;