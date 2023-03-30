import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEstates } from "../estatesReducer";
import HomeTemplate from "./HomeTemplate";
import InternalServerError from "../common/InternalServerError";
import Spinner from "../common/Spinner";
import Logo from "../common/Logo";
import HamburgerMenu from "../common/HamburgerMenu";
import headerImage from "./headerImage.jpg";

const Home = (props) =>{
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
        content = <HomeTemplate estates={estates} filter={searchParams.get('filter')}/>;
    } else if (estateStatus === 'failed') {
        content = <InternalServerError />;
    }
    
    return (
        <Fragment>
            <header className="mb-10" >
                <div className="flex flex-row justify-between px-3 mt-2.5 pb-4 mb-12 border-b border-stone-200">
                    <Logo />
                    <HamburgerMenu />
                </div>
                <div className="">
                    <div className="text-center text-xl sm:text-3xl md:text-4xl xl:text-5xl font-bold tracking-wide mb-16 px-3">
                        <h2 className="mb-2 text-stone-800">
                            <span className="text-green-600">See</span> and <span className="text-green-600">hear</span> what goes on 
                        </h2>
                        <h2 className="text-stone-800text-green-600">
                            in front of your <span className="text-green-600" >future home</span>
                        </h2>
                    </div>
                </div>
            </header>
            {content}
        </Fragment>
    );
};

const loadData = (store, req) => {
    return store.dispatch( fetchEstates());
};

const HomeExport = {
    loadData,
    component: Home
};

export default HomeExport;