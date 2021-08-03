import React from "react";

const NotFound = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    return <h1 className="text-center text-2xl">Ooops!, not found</h1>;
};

export default NotFound;