import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEstates } from "../estatesReducer";
import EstatesTemplate from "./EstatesTemplate";
import InternalServerError from "../common/InternalServerError";
import Spinner from "../common/Spinner";
import Logo from "../common/Logo";
import HamburgerMenu from "../common/HamburgerMenu";
import Slogan from "../common/Slogan";

const Estates = (props) =>{
    const dispatch = useDispatch();
    const estateStatus = useSelector( state => state.estates.status );
    
    useEffect( () => {
        if ( estateStatus === "idle" ) dispatch( fetchEstates() );
    }, [estateStatus, dispatch]);
    
    const searchParams = new URLSearchParams(props.location.search);
    
    const estates = useSelector( state => {
        if (searchParams.has('filter') && searchParams.has('filterId')){
            return state.estates.estates.filter(estate =>{
                return searchParams.get('filterId') === estate[searchParams.get('filter')];
            });
        }else {
            return state.estates.estates;
        }
    });
    
    let content;

    if (estateStatus === 'loading') {
        content = <Spinner/>;
    } else if (estateStatus === 'succeeded') {
        content = <EstatesTemplate estates={estates} filter={searchParams.get('filter')}/>;
    } else if (estateStatus === 'failed') {
        content = <InternalServerError />;
    }
    
    return (
        <Fragment>
            <header className="mb-12" >
                <div className="flex flex-row justify-between mx-3 mt-2.5 mb-4">
                    <Logo />
                    <HamburgerMenu />
                </div>
                <Slogan />
            </header>
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