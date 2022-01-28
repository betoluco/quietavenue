import React from "react";

const Suggestion = props =>{
    return (
        <h3
        onMouseDown={() => props.onMouseDownHandler(props.link)}
        className="p-2 bg-white text-lg hover:bg-green-200" 
        key={props.link}>
            {props.name}
        </h3>
    );
};

export default Suggestion;