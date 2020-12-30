import React, { useEffect }from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProperties } from "../redux/asyncActions";
import { 
    FETCH_PROPERTIES_SUCCEEDED, 
    FETCH_PROPERTIES_FAILED
} from "../redux/actionTypes";
import FetchFail from "./stateless/FetchFail";
import Card from "./stateless/Card";

const Properties = () =>{
    const dispatch = useDispatch();
    const properties = useSelector( (state) => state.properties );
    const fetchPropertiesStatus = useSelector( state => state.fetchPropertiesStatus );
    
    useEffect( () => {
        if ( properties.length == 0 ) dispatch( fetchProperties() );
    }, []);
    
    if ( fetchPropertiesStatus == FETCH_PROPERTIES_FAILED) {
        return <FetchFail />;
    }
    
    if ( fetchPropertiesStatus == FETCH_PROPERTIES_SUCCEEDED && properties.length > 0) {
        const listCards = properties.map( property =>
            <Card property={property} key={property.id}/>
        );
        return (
            <div className="Results">
                {listCards}
            </div>
        );
    }
    
    return <div className="loader">Loading...</div>; 
    
};

const loadData = (store, path) => {
    return store.dispatch( fetchProperties() );
};

export default {
    loadData,
    component: Properties
};