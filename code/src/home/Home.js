import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Search from "../common/Search";
import { fetchEstates } from "../estatesReducer";
import HomeTemplate from "./HomeTemplate";
import InternalServerError from "../common/InternalServerError";
import Spinner from "../common/Spinner";
import neighborhood from "./neighborhood.jpg"

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
            <div 
            className="flex flex-col border-y border-stone-400 py-10 mb-12 bg-center bg-no-repeat bg-cover"
            style={{
                backgroundImage: `url(${neighborhood})` 
            }}>
                <div className="flex justify-center ">
                    <h2 className="text-center font-bold tracking-wide text-stone-50 mb-12 md:mb-16 px-3
                    text-2xl sm:text-4xl xl:text-5xl md:max-w-xl xl:max-w-3xl">
                        See and hear what goes on <br /> in front of your future home
                    </h2>
                </div>
                <Search/>
            </div>
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