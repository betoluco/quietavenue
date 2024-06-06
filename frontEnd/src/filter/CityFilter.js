import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { fetchEstates } from "../estatesReducer";
import {selectStatus, selectContent} from "../selectors";
import FilterTemplate from "./FilterTemplate";

const CityFilter = (props) =>{
    const dispatch = useDispatch();
    const fetchStatus = useSelector(state => selectStatus(state));
    const {filterId, city} = useParams();
    
    useEffect( () => {
        if ( fetchStatus === "idle" ) dispatch( fetchEstates() );
    }, [fetchStatus, dispatch]);
    
    const content = useSelector(state => selectContent(state, filterId, "cityId"));
    
    return <FilterTemplate content={content} filter={city} />;
};

const loadData = (store, req) => {
    return store.dispatch( fetchEstates());
};

const CityFilterExport = {
    loadData,
    element: <CityFilter />,
};

export default CityFilterExport;