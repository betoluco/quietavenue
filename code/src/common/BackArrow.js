import React from "react";
import { useHistory } from "react-router-dom";

const BackArrow = (props) => {
    const history = useHistory();
    
    const onClickHandler = event =>{
        history.length > 0? history.goBack(): history.push("/");
    };
    
    return (
        <button onClick={onClickHandler} data-cy="backArrow">
            <span className="hidden">back</span>
            <span 
            className="block bg-stone-800 w-5 md:w-6 h-1 rounded-sm 
            mb-[8px] md:mb-[11px] -rotate-45">
            </span>
            <span 
            className="block bg-stone-800 w-5 md:w-6 h-1 rounded-sm rotate-45">
            </span>
        </button>
    );
};

export default BackArrow;