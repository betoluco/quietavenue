import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchFilteredProperties } from "../redux/asyncActions";
import FetchFail from "./stateless/FetchFail";
import Card from "./stateless/Card";
import NotFound  from "./stateless/NotFound";
import PropertiesTemplate from "./stateless/PropertiesTemplate";

const FilterProperties = (props) =>{
    
    const dispatch = useDispatch();
    const city = new URLSearchParams(props.location.search).get("city");
    
    const properties = useSelector( state => state.cities[city] );
    const statusCode = useSelector( state => state.statusCode );
    
     useEffect( () => {
        if ( properties === undefined) dispatch( fetchFilteredProperties(city) );
    }, []);
    
    if (statusCode !== undefined) {
        if(statusCode === 404){
            return <NotFound />;
        }
        return <FetchFail />;
    }
    
    if ( properties !== undefined) {
        const listCards = properties.map( property =>
            <Card property={property} key={property.id}/>
        );
        return (
            <PropertiesTemplate listCards={listCards} />
        );
    }
    
     return <div className="loader">Loading...</div>;
    
};

const loadData = (store, req) => {
    const city = req.query.city;
    return store.dispatch(fetchFilteredProperties(city));
};

const propertiesExport = {
    loadData,
    component: FilterProperties
};

export default propertiesExport;