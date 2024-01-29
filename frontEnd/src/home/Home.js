import React, { Fragment, useEffect } from "react";
import { useSearchParams, useLoaderData, } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import Search from "../common/Search";
import { fetchEstates } from "../estatesReducer";
import HomeTemplate from "./HomeTemplate";
import InternalServerError from "../common/InternalServerError";
import Spinner from "../common/Spinner";
import neighborhoodLG from "./neighborhoodLG.jpg";
import neighborhoodMD from "./neighborhoodMD.jpg";

const Home = (props) =>{
    const dispatch = useDispatch();
    const estateStatus = useSelector( state => state.estates.status );
    const [searchParams, setSearchParams] = useSearchParams();
    
    useEffect( () => {
        if ( estateStatus === "idle" ) dispatch( fetchEstates() );
    }, [estateStatus, dispatch]);
    
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
            <div className="">
                <div className="flex flex-col  py-10 mb-12 absolute w-full">
                    <div className="flex justify-center ">
                        <h2 className="text-center font-bold tracking-wide text-stone-50 mb-12 md:mb-16 px-3
                        text-2xl sm:text-4xl xl:text-5xl md:max-w-xl xl:max-w-3xl">
                            See and hear what goes on <br /> in front of your future home
                        </h2>
                    </div>
                    <Search/>
                </div>
                <img 
                className="border-y border-stone-400 min-h-[300px] object-cover"
                alt="main header"
                srcSet={`
                    ${neighborhoodMD} 1000w,
                    ${neighborhoodLG} 4300w
                `}
                sizes="100vw"
                src={neighborhoodLG} />
            </div>
            {content}
        </Fragment>
    );
};

const loadData = (store, req) => {
    return store.dispatch( fetchEstates());
};

const homeExport = {
    loadData,
    element: <Home />,
};

export default homeExport;