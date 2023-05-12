import React, { useEffect } from "react";
import { useSelector} from "react-redux";
import { Redirect } from "react-router-dom";

import EstateTemplate from "./EstateTemplate";
import { fetchEstates } from "../estatesReducer";
import AudioPlayer from "./graph/AudioPlayer";



const Estate = (props) =>{
    const estateId = props.match.params.estateId;
    
    const estate = useSelector( (state) =>
        state.estates.estates.find( estate => estate.id === estateId)
    );
    
    if( !estate ){
        return <Redirect to="/notFound" />;
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
    
    let graphs = [];
    if (estate.audioData){
        Object.keys(estate.audioData).forEach((day) => {
            graphs.push(
                <AudioPlayer
                graphData={estate.audioData[day].graphData}
                mp3Link = {estate.audioData[day].mp3Link}
                key={day}
                day={day}
                sunset={estate.sunset}
                sunrise={estate.sunrise}/>
            );
        });
    }
    
    return <EstateTemplate estate={estate} price={price} graphs={graphs}/>;
};

const loadData = (store, req) => {
    return store.dispatch( fetchEstates() );
};

const estateExport = {
    loadData,
    component: Estate
};

export default estateExport;