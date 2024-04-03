import React, { Fragment } from "react";

const XAxis = props =>{
    const xAxisTicks = [];
    const shownTicks = [1, 3, 5, 7]
    props.timeScale.ticks().forEach( (tick, index, array) =>{
        if (shownTicks.includes(index)) {
           xAxisTicks.push(
               <text 
                key={tick}
                x={props.timeScale(tick)}
                y={props.height} 
                fontSize={`${props.fontSize}rem`}
                textAnchor="middle">
                    {tick.getHours() + ":00"}
                </text>
            );
        }
    });
    
    return(
        <Fragment>
            {xAxisTicks}
        </Fragment>
    );
};

export default XAxis;