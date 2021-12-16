import React, { Fragment, useEffect } from "react";
import { renderRoutes } from "react-router-config";

const Root = ( props ) => {
    
    useEffect( () => {
        window.gtag('config', 'G-X36JD5Z2M5', {
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