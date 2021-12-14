import React, { Fragment, useEffect } from "react";
import { renderRoutes } from "react-router-config";

const Root = ({ route }) => {
    useEffect( () => {
        
    }, []);
    
    return (
        <Fragment>
            { renderRoutes(route.routes) }
        </Fragment>
    );
};

export default Root;