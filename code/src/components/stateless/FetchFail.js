import React from "react";

const FetchFail = props =>{
    return (
        <div className="FetchFail">
            <h1>Ooops!, something went wrong!</h1>
            <ul>
                <li><h2>Check your internet connection</h2></li>
                <li><h2>Try refreshing the page</h2></li>
            </ul>
        </div>
    );
};

export default FetchFail