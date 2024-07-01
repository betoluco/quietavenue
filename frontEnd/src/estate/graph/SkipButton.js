import React from "react";

import skipIcon from "./skipOp.svg";

const ProgressBar = props =>{
    return(
        <button onClick={() => props.changeTrack(1)} className="w-10">
            <img src={skipIcon} alt="Play Next"/>
        </button>
    );
};

export default ProgressBar;