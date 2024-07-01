import React from "react";

import backIcon from "./backOp.svg";

const ProgressBar = props =>{
    return(
        <button onClick={() => props.changeTrack(-1)} className="w-10 " >
            <img src={backIcon} alt="Play Previous"/>
        </button>
    );
};

export default ProgressBar; 