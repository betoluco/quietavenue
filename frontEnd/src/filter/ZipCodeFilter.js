import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { fetchEstates } from "../estatesReducer";
import FilterTemplate from "./FilterTemplate";

const ZipCodeFilter = (props) =>{
    const dispatch = useDispatch();
    const estateStatus = useSelector( state => state.estates.status );
    const {filterId} = useParams();
    const {zipCode} = useParams();
    
    useEffect( () => {
        if ( estateStatus === "idle" ) dispatch( fetchEstates() );
    }, [estateStatus, dispatch]);
    
    const estates = useSelector( state => {
        if (filterId !== undefined){
            return state.estates.estates.filter(estate => parseInt(filterId) === estate.cityId);
        }else {
            return state.estates.estates;
        }
    });
    
    return <FilterTemplate estateStatus={estateStatus} estates={estates} filter={zipCode}/>;
};

const loadData = (store, req) => {
    return store.dispatch( fetchEstates());
};

const CityFilterExport = {
    loadData,
    element: <ZipCodeFilter />,
};

export default CityFilterExport;