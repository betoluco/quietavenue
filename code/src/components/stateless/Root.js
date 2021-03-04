import React, { Fragment } from "react";
import { renderRoutes } from "react-router-config";

const Root = ({ route }) => {
    return (
        <Fragment>
            { renderRoutes(route.routes) }
        </Fragment>
    );
};

export default Root;