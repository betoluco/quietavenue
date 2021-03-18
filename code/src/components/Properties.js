import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProperties } from "../redux/asyncActions";
import FetchFail from "./stateless/FetchFail";
import Card from "./stateless/Card";
import PropertiesTemplate from "./stateless/PropertiesTemplate";

const Properties = (props) =>{
    const dispatch = useDispatch();
    const properties = useSelector( state => state.ALL_PROPERTIES );
    const statusCode = useSelector( state => state.statusCode );
    
    useEffect( () => {
        if ( properties.length === 0) dispatch( fetchProperties() );
    }, []);
    
    if (statusCode !== undefined) {
        return <FetchFail />;
    }
    
    if (properties !== undefined) {
        const listCards = properties.map( property =>
            <Card property={property} key={property.PK}/>
        );
        return  <PropertiesTemplate listCards={listCards} />;
    }
    
    return <div className="">Loading...</div>;
    
};

const loadData = (store, req) => {
    return store.dispatch( fetchProperties() );
};

const propertiesExport = {
    loadData,
    component: Properties
};

export default propertiesExport;