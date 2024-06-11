import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { fetchEstates } from "../estatesReducer";
import {selectStatus, selectContent} from "../selectors";
import FilterTemplate from "./FilterTemplate";

const ZipCodeFilter = (props) =>{
    const dispatch = useDispatch();
    const fetchStatus = useSelector(state => selectStatus(state));
    const {filterId, zipCode} = useParams();
    
    useEffect( () => {
        if ( fetchStatus === "idle" ) dispatch( fetchEstates() );
    }, [fetchStatus, dispatch]);
    
    const content = useSelector(state => selectContent(state, filterId, "zipCodeId"));
    return <FilterTemplate content={content} filter={zipCode} />;
};

const loadData = (store, req) => {
    return store.dispatch( fetchEstates());
};

const CityFilterExport = {
    loadData,
    element: <ZipCodeFilter />,
};

export default CityFilterExport;