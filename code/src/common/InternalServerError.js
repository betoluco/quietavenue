import React from "react";

const InternalServerError = (props) =>{
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl text-stone-800 mb-2">Something went wrong!</h1>
            <h2 className="text-lg text-stone-800">Check your internet connection</h2>
            <h2 className="text-lg text-stone-800">try refreshing the page</h2>
        </div>
    );
};

export default InternalServerError;