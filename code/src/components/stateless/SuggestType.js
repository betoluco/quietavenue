import React from "react";

const SuggestType = props =>{
    return ( 
        <h4 className="p-2 bg-white text-sm border-b-2 border-green-600 border-opacity-50">
            {props.type}
        </h4>
    );
};

export default SuggestType;