import React, { useRef, useEffect, useState, Fragment } from "react";
import { scaleBand, scaleTime, scaleLinear} from "d3-scale";
import { timeDay } from "d3-time";
import { axisBottom, axisLeft} from "d3-axis";
import { select } from "d3-selection";
import { timeFormat } from "d3-time-format";
import { zoom } from "d3-zoom";

import AudioPlayer from "./stateless/AudioPlayer";

const Graph = props =>{
    const margin = { top: 10, right: 10, bottom: 30, left: 100 },
    width = 843, //16:9 screen ratio
    height = 1500,
    colorRange = ["#005bab", "#ff1100"];
    
    const xAxisRef = useRef();
    const yAxisRef = useRef();
    const graph = useRef();
    
    const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 });
    const [mp3Link, setmp3Link] = useState("");
    
    useEffect(() =>{
        select(xAxisRef.current).call(xAxis);
        const gY = select(yAxisRef.current).call(yAxis);
        
        const graphZoom = zoom()
        .scaleExtent([1, 9])
        .translateExtent([[0, 0], [width, height]])
        .on("zoom", (event) => {
            gY.call(yAxis.scale(event.transform.rescaleY(yScale)));
            setTransform(event.transform);
        });
        
        select(graph.current).call(graphZoom);
    },);
    
        
    const firstDay = timeDay.floor(new Date(props.dataPoints[0].StartTime));
    const lastDay = timeDay.ceil(new Date(props.dataPoints[props.dataPoints.length - 1].StartTime));
    const domainDays = timeDay.range(firstDay, lastDay);
    
    const xScale = scaleBand()
        .domain(domainDays)
        .range([ margin.left, width - margin.right ])
        .paddingInner(0.1);
    
    const xAxis = axisBottom(xScale).tickFormat(timeFormat("%a %d")).tickSizeOuter(0);
    
    const today = new Date();
    
    const yScale = scaleTime()
        .domain([timeDay.floor(today), timeDay.ceil(today)])
        .range([height - margin.bottom, margin.top]);
    
    const yAxis = axisLeft(yScale).tickFormat(timeFormat("%H:%M"));
        
    const colorScale = scaleLinear()
        .domain([0, 1])
        .range(colorRange);
    
    const rects = props.dataPoints.map( point =>{
        const startTime = new Date(point.StartTime);
        const stopTime = new Date(point.StopTime);
        const xPosition = xScale(timeDay.floor(startTime));
        today.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), 0);
        const yStartPosition = yScale(today);
        today.setHours(stopTime.getHours(), stopTime.getMinutes(), stopTime.getSeconds(), 0);
        const yStopPosition = yScale(today);
        let height = yStartPosition - yStopPosition;
        height = Math.ceil(height);
        if( height == 0){
            height = 1;
        }
        
        return <rect 
        key={point.mp3Link}
        width={xScale.bandwidth()}
        height={height}
        x={xPosition} 
        y={yStopPosition}
        fill={colorScale(point.maxLoudness)}
        onClick={() => setmp3Link(point.mp3Link)}/>;
    });
    
    return (
        <Fragment>
            <svg 
            ref={graph}
            height="95vh"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspecRatio="xMidYMid meet"
            className="Graph">
                <clipPath id="dataClip">
                    <rect 
                        x="0"
                        y="0"
                        width={width} 
                        height={height -margin.bottom} />
                </clipPath>
                
                
                <g className="Graph__Axis" ref={yAxisRef} transform={`translate(${margin.left}, 0)`}/>
                <g clipPath="url(#dataClip)">
                    <g transform={`translate(0, ${y}) scale(1, ${k})`}>
                        {rects}
                    </g>
                </g>
                <g className="Graph__Axis" ref={xAxisRef} transform={`translate(0, ${height - margin.bottom})`}/>
            </svg>
            <AudioPlayer audioFile={mp3Link}/>
        </Fragment>
    );
};

export default Graph;