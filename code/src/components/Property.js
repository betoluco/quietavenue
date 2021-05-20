import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch} from "react-redux";
import path from "path";

import { fetchProperty } from "../redux/asyncActions";
import PropertyTemplate from "./stateless/PropertyTemplate";
import FetchFail from "./stateless/FetchFail";
import NotFound  from "./stateless/NotFound";
import PropertiesHeader from "./stateless/PropertiesHeader";
import PropertyHeader from "./stateless/PropertyHeader"


const Property = (props) =>{
   
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const property = useSelector( (state) => state.properties.[id]);
    const statusCode = useSelector( state => state.statusCode );
    
    useEffect( () => {
        if ( property === undefined ) dispatch( fetchProperty(id) );
    }, []);
    
    if (statusCode !== undefined) {
        if( statusCode === 404){
            return (
                <Fragment>
                    <PropertiesHeader />
                    <NotFound />
                </Fragment>
            );
        }
        return (
            <Fragment>
                <PropertiesHeader />
                <FetchFail />
            </Fragment>
        );
    }
    
    if (property !== undefined) {
        return <PropertyTemplate property={property} />;
    }
    
    return (
        <Fragment>
            <PropertyHeader />
            <div className="loader">Loading...</div>
        </Fragment>
    );
};

const loadData = (store, req) => {
    const id = path.basename(req.path);
    return store.dispatch( fetchProperty(id) );
};

const propertyExport = {
    loadData,
    component: Property
};

export default propertyExport;