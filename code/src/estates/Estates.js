import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEstates } from "../estatesReducer";
import EstatesTemplate from "./EstatesTemplate";
import InternalServerError from "../common/InternalServerError";
import Spinner from "../common/Spinner";
import Logo from "../common/Logo";
import HamburgerMenu from "../common/HamburgerMenu";
import headerImage from "./headerImage.jpg"
import Search from "../common/Search"

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
                <div className="flex flex-row justify-between mx-3 mt-2.5 pb-2 mb-4 border-b border-strone-100">
                    <Logo />
                    <HamburgerMenu />
                </div>
                <div className="border-y rounded-sm border-stone-100 bg-no-repeat bg-cover bg-center lg:bg-bottom h-96 lg:h-[30] xl:h-[36]"
                style={{
                backgroundImage: `linear-gradient(to bottom, hsla(0, 0%, 0%, 0.4), hsla(0, 0%, 0%, 0)),
                url(${headerImage})`,
                }}>
                    <h2 
                    className="text-center text-lg md:text-3xl text-white font-medium tracking-wide
                    mb-10 mt-12 px-3 mx-auto max-w-xl drop-shadow-lg">
                        See and hear what goes on in front of your future home
                    </h2>
                    <Search />
                </div>
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