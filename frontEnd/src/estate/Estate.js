import React, { useEffect } from "react";
import { useSelector} from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import EstateTemplate from "./EstateTemplate";
import { fetchEstates } from "../estatesReducer";
import AudioPlayer from "./graph/AudioPlayer";



const Estate = (props) =>{
    const { estateId } = useParams();
    const estate = useSelector( (state) =>
        state.estates.estates.find( estate => estate.estateId === parseInt(estateId))
    );
    
    if( !estate ){
        return <Navigate to="/notFound" />;
    }
    
    const moneyOptions = {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits: 3
    };
    const money = new Intl.NumberFormat('en-US', moneyOptions);
    
    let price = undefined;
    if(estate.price){
        price = money.format(parseFloat(estate.price));
    }
    
    let graph = undefined;
    if (estate.audioData){
        graph = <AudioPlayer audioData={estate.audioData} />;
    }
    
     
    
    return <EstateTemplate estate={estate} price={price} graph={graph}/>;
};

const loadData = (store, req) => {
    return store.dispatch( fetchEstates() );
};

const estateExport = {
    loadData,
    element: <Estate />,
};

export default estateExport;