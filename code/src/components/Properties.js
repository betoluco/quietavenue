import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import path from "path";

import { fetchProperties } from "../redux/asyncActions";
import { 
    FETCH_PROPERTIES_SUCCEEDED,
    PROPERTIES_NOT_FOUND,
    FETCH_PROPERTIES_FAILED
} from "../redux/actionTypes";
import FetchFail from "./stateless/FetchFail";
import Card from "./stateless/Card";
import NotFound  from "./stateless/NotFound";

const PropertiesNotFound = NotFound.component;

const Properties = (props) =>{
    const dispatch = useDispatch();
    let city = props.match.params.city ||"ALL_PROPERTIES";
    
    console.log('city porperties', city);
    
    const properties = useSelector( (state) => state[city] );
    console.log('Properties', properties)
    const fetchPropertiesStatus = useSelector( state => state.fetchPropertiesStatus );
    
    useEffect( () => {
        console.log('useEffect')
        if ( properties === undefined) dispatch( fetchProperties(city) );
    }, []);
    
    if ( fetchPropertiesStatus === PROPERTIES_NOT_FOUND) {
        return <PropertiesNotFound  staticContext={props.staticContext}/>;
    }
    
    if ( fetchPropertiesStatus === FETCH_PROPERTIES_FAILED) {
        return <FetchFail />;
    }
    
    if ( fetchPropertiesStatus === FETCH_PROPERTIES_SUCCEEDED && properties !== undefined) {
        const listCards = properties.map( property =>
            <Card property={property} key={property.id}/>
        );
        return (
            <div className="Properties">
                {listCards}
            </div>
        );
    }
    
    return <div className="loader">Loading...</div>; 
    
};

const loadData = (store, req) => {
    const city = path.basename(req.path) || "ALL_PROPERTIES";
    return store.dispatch( fetchProperties(city) );
};

const propertiesExport = {
    loadData,
    component: Properties
};

export default propertiesExport;