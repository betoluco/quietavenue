import React, { Fragment } from "react";

const XAxis = props =>{
    const xAxisTicks = [];
    props.timeScale.ticks(3).forEach( (tick, index, array) =>{
        let textAnchor = "middle";
        if (index === 0) textAnchor = "start";
        if (index === array.length - 1) textAnchor = "end";
        xAxisTicks.push(
            <text 
            key={tick}
            x={props.timeScale(tick)}
            y={props.height} 
            fontSize={`${props.fontSize}rem`}
            textAnchor={textAnchor}>
                {tick.getHours() + ":00"}
            </text>
        );
    });
    
    return(
        <Fragment>
            {xAxisTicks}
        </Fragment>
    );
};

export default XAxis;