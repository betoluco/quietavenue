import React from "react";

const NotFoundPage = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    return <h1 className="NotFound">Ooops!, not found</h1>;
};

const notFoundExport = {
    component: NotFoundPage
};

export default notFoundExport;