import React from "react";

import plusSign from "./plusSignOp.svg";
import minusSign from "./minusSignOp.svg";

const Controls = (props) => {
    return(
        <div className="flex flex-row-reverse relative mr-6 -mb-16">
            <div className="flex items-center select-none" >
                <button 
                onClick={props.resetZoom}
                className="bg-stone-900 text-white tracking-wider text-sm font-medium p-2 mr-3 rounded">
                    Reset
                </button>
                <div className="flex flex-col">
                    <button onClick={() =>{props.zoomButtons(1.12)}}>
                        <img className="w-8 transform hover:scale-125 mb-1" src={plusSign} alt="Zoom in"/>
                    </button>
                    <button onClick={() =>{props.zoomButtons(0.88)}}>
                        <img className="w-8 transform hover:scale-125 mt-1" src={minusSign} alt="Zoom out"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Controls;