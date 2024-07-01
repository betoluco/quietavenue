import React, {Fragment} from "react";

const ProgressBar = props =>{
    const updateProgressBar = (trackProgress, max) =>{
        const currentPercentage = `${(trackProgress / max) * 100}%`;
        return `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #a8a29e), 
        color-stop(${currentPercentage}, #fff))`;
    };
    
    const convertTime = time =>{
        const minutes = Math.floor(time / 60);
        const seconds = (time % 60).toString().padStart(2, "0");
        return (`${minutes}:${seconds}`);
    };
    
    return(
        <Fragment>
            <div className="w-full flex">
                <input 
                className="w-full" 
                style={{ 
                    background: updateProgressBar(props.elapsedTime, props.duration),  
                    border: '0.2px solid #292524',
                    borderRadius: '4px',
                    height: '10px'
                }}
                type="range" min="0" max={props.duration} step="1" 
                value={props.elapsedTime} 
                onChange={ event =>  props.audio.current.currentTime = event.target.value}/>
            </div> 
                
            <div className="w-full flex justify-end">
                <h5 className="text-stone-800 text-xs">
                    {convertTime(props.elapsedTime)}
                    <span> / </span> 
                    {convertTime(props.duration)}
                </h5>
            </div>
        </Fragment>
    );
};

export default ProgressBar;