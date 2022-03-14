import React, { Fragment, useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { useSelector } from "react-redux";

import { estateSuggest } from "./trie";
import { zipCodeSuggest } from "./trie";
import { citySuggest } from "./trie";

const Root = ( props ) => {
    const estates = useSelector( state => state.estates.estates );
    
    useEffect( () => {
        estates.map( estate => {
            estate.estateSuggest.map( suggest =>{
                 estateSuggest.insert(suggest, estate);
            });
        });
    }, []);
    
    useEffect( () => {
        window.gtag('config', 'G-439GZCCJLJ', {
            page_title: props.location.pathname,
            page_path: props.location.pathname,
        });
        
    }, [props.location.pathname]);
    
    return (
        <Fragment>
            { renderRoutes(props.route.routes) }
        </Fragment>
    );
};


export default Root;