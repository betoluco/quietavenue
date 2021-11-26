import React from "react";
import { useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
import path from "path";

import { fetchEstate } from "../redux/asyncActions";
import EstateTemplate from "./stateless/EstateTemplate";


const Estate = (props) =>{
    const estateId = props.match.params.estateId
    const estate = useSelector( state => state.[estateId]);
    const statusCode = useSelector( state => state.statusCode );
    
    const moneyOptions = {style: 'currency', currency: 'USD'};
    const money = new Intl.NumberFormat('en-US', moneyOptions);
    
    let price = undefined;
    if(estate.price){
        price = money.format(parseFloat(estate.price))
    }
    
    if( statusCode === 404){
        return <Redirect to="/notFound" />;
    }
    
    return <EstateTemplate estate={estate} price={price}/>;
};

const loadData = (store, req) => {
    const estateId = path.basename(req.path);
    return store.dispatch( fetchEstate(estateId) );
};

const estateExport = {
    loadData,
    component: Estate
};

export default estateExport;