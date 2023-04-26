import React, { Fragment, useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { useSelector } from "react-redux";

import { estateSuggest } from "./trie";
import { zipCodeSuggest } from "./trie";
import { citySuggest } from "./trie";
import logo from "./common/images/quietavenueLogoOp.svg";
import Header from "./common/Header";

const Root = ( props ) => {
    const estates = useSelector( state => state.estates );
    
    useEffect( () => {
        if (estates.status === 'succeeded'){
            estates.estates.forEach( estate => {
                estate.estateSuggest.map( suggest =>{
                    const name = estate.address1 + " " + estate.address2;
                    const link = '/estate/'+ estate.id;
                    estateSuggest.insert(suggest, name, link);
                });
                estate.citySuggest.map( suggest =>{
                    const link = "/?filter=cityId&filterId=" + estate.cityId;
                    citySuggest.insert(suggest, estate.city, link); 
                });
                estate.zipCodeSuggest.map( suggest =>{
                    const link = "/?filter=zipCode&filterId=" + estate.zipCode;
                    zipCodeSuggest.insert(suggest, estate.zipCode, link) ;
                });
            });
        }
    }, [estates.status]);
    
    useEffect( () => {
        window.gtag('config', 'G-439GZCCJLJ', {
            page_title: props.location.pathname,
            page_path: props.location.pathname,
        });
        
    }, [props.location.pathname]);
    
    return (
        <Fragment>
            <Header />
            { renderRoutes(props.route.routes) }
            <div className="flex flex-col w-full bg-stone-100 py-6 mt-24">
                <img src={logo} alt="Company logo" className="h-7 md:h-9 mb-3" />
                <p className="text-center text-xs text-stone-800">
                    quietavenue.com property of quietavenue.LLC all rights reserved
                </p>
            </div>
        </Fragment>
    );
};


export default Root;