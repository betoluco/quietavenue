import React, { useEffect } from "react";
import { useSelector} from "react-redux";
import { Redirect } from "react-router-dom";

import EstateTemplate from "./EstateTemplate";
import { fetchEstates } from "../estatesReducer";

const Estate = (props) =>{
    const estateId = props.match.params.estateId;
    
    const estate = useSelector( (state) =>
        state.estates.estates.find( estate => estate.id === estateId)
    );
    
    if( !estate ){
        return <Redirect to="/notFound" />;
    }
    
    const moneyOptions = {style: 'currency', currency: 'USD'};
    const money = new Intl.NumberFormat('en-US', moneyOptions);
    
    let price = undefined;
    if(estate.price){
        price = money.format(parseFloat(estate.price));
    }
    return <EstateTemplate estate={estate} price={price}/>;
};

const loadData = (store, req) => {
    return store.dispatch( fetchEstates() );
};

const estateExport = {
    loadData,
    component: Estate
};

export default estateExport;