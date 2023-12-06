import React, { Fragment, useEffect } from "react";
import { renderRoutes } from "react-router-config";

import Header from "./common/Header";
import Footer from "./common/Footer";

const Root = ( props ) => {
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
            <Footer />
        </Fragment>
    );
};


export default Root;