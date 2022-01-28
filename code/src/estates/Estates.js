import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEstates } from "../estatesReducer";
import EstatesTemplate from "./EstatesTemplate";
import InternalServerError from "../common/InternalServerError";
import Spinner from "../common/Spinner";
import Header from '../common/Header';

const Estates = (props) =>{
    const dispatch = useDispatch();
    const estateStatus = useSelector( state => state.estates.status );
    
    useEffect( () => {
        if ( estateStatus === "idle" ) dispatch( fetchEstates() );
    }, [estateStatus, dispatch]);
    
    const searchParams = new URLSearchParams(props.location.search)
    
    const estates = useSelector( state => {
        if (searchParams.has('filter') && searchParams.has('filterId')){
            
            return state.estates.estates.filter(estate =>{
                return searchParams.get('filterId') === estate.[searchParams.get('filter')]
            });
        }else {
            return state.estates.estates;
        }
    });
        
        
    
   
    let content;

    if (estateStatus === 'loading') {
        content = <Spinner/>;
    } else if (estateStatus === 'succeeded') {
        content = <EstatesTemplate estates={estates} />;
    } else if (estateStatus === 'failed') {
        content = <InternalServerError />;
    }
    
    return (
        <Fragment>
            <Header />
            {content}
        </Fragment>
    );
};

const loadData = (store, req) => {
    return store.dispatch( fetchEstates());
};

const estatesExport = {
    loadData,
    component: Estates
};

export default estatesExport;