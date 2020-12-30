import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";

import { fetchProperty } from "../redux/asyncActions";
import { 
    FETCH_PROPERTY_SUCCEEDED, 
    PROPERTY_NOT_FOUND,
    FETCH_PROPERTY_FAILED
} from "../redux/actionTypes";
import PropertyTemplate from "./stateless/PropertyTemplate";
import FetchFail from "./stateless/FetchFail";
import NotFound  from "./stateless/NotFound";

const Property = (props) =>{
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const property = useSelector( (state) => state[id] );
    const fetchPropertyStatus = useSelector( state => state.fetchPropertyStatus );
    
    useEffect( () => {
        if ( property === undefined ) dispatch( fetchProperty(id) );
    }, []);
    

    if ( fetchPropertyStatus == PROPERTY_NOT_FOUND) {
        console.log("NotFound", NotFound.component)
        return <NotFound.component />;
    }
    
    if ( fetchPropertyStatus == FETCH_PROPERTY_FAILED) {
        return <FetchFail />;
    }
    
    if ( fetchPropertyStatus == FETCH_PROPERTY_SUCCEEDED && property != undefined) {
        return <PropertyTemplate property={property} />;
    }
    
    return <div className="loader">Loading...</div>; 
};

const loadData = (store, path) => {
    const id = path.split("/").pop();
    return store.dispatch( fetchProperty(id) );
};

export default {
    loadData,
    component: Property
};