import React from "react";

const TrackIndicator = props =>{
    const getDateString = currentTrack =>{
        return new Date(props.daysList[currentTrack]).toLocaleDateString(
            "en-US",
            {weekday: 'short', month: 'short', day: 'numeric'}
        );
    };
    
    return(
        <div className="grid gap-10 grid-cols-3 grid-rows-1 items-center mb-3">
            <h5 className="text-xs text-right">
                {props.daysList[props.currentTrack - 1] != undefined && 
                getDateString(props.currentTrack - 1)}
            </h5>
            <h5 className="font-medium">
                {getDateString(props.currentTrack)}
            </h5>
            <h5 className="text-xs text-left">
                {props.daysList[props.currentTrack + 1] != undefined && 
                getDateString(props.currentTrack + 1)}
            </h5>
        </div>
    )
};

export default TrackIndicator