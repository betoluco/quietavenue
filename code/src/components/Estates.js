import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEstates } from "../redux/asyncActions";
import EstatesTemplate from "./stateless/EstatesTemplate";
import InternalServerError from "./stateless/InternalServerError";
import Spinner from "./stateless/Spinner";

const Estates = (props) =>{
    const groupId = "allProperties";
    const endPoint = "match_all/" + groupId; 
    const dispatch = useDispatch();
    const estates = useSelector( state => state.[groupId] );
    const statusCode = useSelector( state => state.statusCode );
    
    useEffect( () => {
        if ( estates === undefined ) dispatch( fetchEstates(endPoint, groupId) );
    }, []);
    
    if (statusCode === 500 ) {
        return <InternalServerError />;
    }
    
    if (estates !== undefined && statusCode === 200) {
        return <EstatesTemplate estates={estates} />;
    }
    
    return <Spinner/>;
};

const loadData = (store, req) => {
    const groupId = "allProperties";
    const endPoint =  "match_all/" + groupId;
    return store.dispatch( fetchEstates(endPoint, groupId) );
};

const estatesExport = {
    loadData,
    component: Estates
};

export default estatesExport;