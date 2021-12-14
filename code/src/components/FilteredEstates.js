import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import path from "path";
import { Redirect } from "react-router-dom";

import { fetchEstates } from "../redux/asyncActions";
import EstatesTemplate from "./EstatesTemplate";
import InternalServerError from "./stateless/InternalServerError";
import Spinner from "./stateless/Spinner";

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
        return <InternalServerError />;
    }
    
    if (statusCode === 404 ) {
        return <Redirect to="/notFound" />;
    }
    
    if (estates !== undefined && statusCode === 200) {
        return <EstatesTemplate estates={estates} filter={filter}/>;
    }
    
    return <Spinner/>;
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