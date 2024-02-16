import React, { Fragment, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { fetchEstates } from "../estatesReducer";
import FilterTemplate from "./FilterTemplate";

const CityFilter = (props) =>{
    const dispatch = useDispatch();
    const estateStatus = useSelector( state => state.estates.status );
    const {filterId} = useParams();
    const {city} = useParams();
    
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
    
    return <FilterTemplate estateStatus={estateStatus} estates={estates} filter={city}/>;
};

const loadData = (store, req) => {
    return store.dispatch( fetchEstates());
};

const CityFilterExport = {
    loadData,
    element: <CityFilter />,
};

export default CityFilterExport;