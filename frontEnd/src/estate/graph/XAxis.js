import React, { Fragment } from "react";

const XAxis = props =>{
    const xAxisTicks = props.timeScale.ticks().map( (tick, index, array) =>{
        let textAnchor = "middle";
        if (index === 0) textAnchor = "start";
        else if (index === array.length -1) textAnchor = "end";
        
        return (
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
            <line
            x1={props.timeScale(props.timeScale.domain()[0])} 
            y1={props.loudnessScale(1)} 
            x2={props.timeScale(props.timeScale.domain()[1])}  
            y2={props.loudnessScale(1)} 
            stroke="black" 
            shapeRendering="crispEdges"
            strokeWidth="0.2" />
            {xAxisTicks}
        </Fragment>
    );
};

export default XAxis;