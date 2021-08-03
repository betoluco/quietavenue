import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import path from "path";
import { Redirect } from "react-router-dom";

import { fetchEstates } from "../redux/asyncActions";
import EstatesTemplate from "./stateless/EstatesTemplate";

const Estates = (props) =>{
    const groupId = props.match.params.groupId;
    const filter = props.match.params.filter;
    const endPoint =  filter + "/" + groupId; 
    const dispatch = useDispatch();
    const estates = useSelector( state => state.[groupId] );
    const statusCode = useSelector( state => state.statusCode );
    
    useEffect( () => {
        if ( estates === undefined ) dispatch( fetchEstates(endPoint, groupId) );
    }, []);
    
    if (statusCode === 500 ) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="text-2xl mb-2">Something went wrong!</h1>
                <h2 className="text-lg">Check your internet connection</h2>
                <h2 className="text-lg">try refreshing the page</h2>
            </div>
        );
    }
    
    if (statusCode === 404 ) {
        return <Redirect to="/notFound" />;
    }
    
    if (estates !== undefined && statusCode === 200) {
        return <EstatesTemplate estates={estates} filter={filter}/>;
    }
    
    return <div className="">Loading...</div>;
};

const loadData = (store, req) => {
    const groupId = path.basename(req.path);
    const filter = path.basename(path.dirname(req.path));
    const endPoint = filter + "/" + groupId;
    return store.dispatch( fetchEstates(endPoint, groupId) );
};

const estatesExport = {
    loadData,
    component: Estates
};

export default estatesExport;