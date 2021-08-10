import React, { useRef, useEffect, useState, Fragment } from "react";
import { scaleBand, scaleTime, scaleLinear} from "d3-scale";
import { timeDay } from "d3-time";
import { axisBottom, axisLeft} from "d3-axis";
import { select } from "d3-selection";
import { timeFormat } from "d3-time-format";
import { zoom } from "d3-zoom";

import AudioPlayer from "./stateless/AudioPlayer";

const Graph = props =>{
    const margin = { top: 10, right: 10, bottom: 35, left: 98},
    width = 843, //16:9 screen ratio
    height = 1500,
    colorRange = ["#005bab", "#ff1100"];
    
    const xAxisRef = useRef();
    const yAxisRef = useRef();
    const graph = useRef();
    
    const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 });
    const [mp3Link, setmp3Link] = useState("");
    
    useEffect(() =>{
        select(xAxisRef.current)
        .style("font-size","1.4rem")
        .call(xAxis);
        const gY = select(yAxisRef.current)
        .style("font-size","1.7rem")
        .call(yAxis);
        
        const graphZoom = zoom()
        .scaleExtent([1, 9])
        .translateExtent([[0, 0], [width, height]])
        .on("zoom", (event) => {
            gY.call(yAxis.scale(event.transform.rescaleY(yScale)));
            setTransform(event.transform);
        });
        
        select(graph.current).call(graphZoom);
    }, []);
    
        
    const firstDay = timeDay.floor(new Date(props.dataPoints[0].startTime));
    const lastDay = timeDay.ceil(new Date(props.dataPoints[props.dataPoints.length - 1].startTime));
    const domainDays = timeDay.range(firstDay, lastDay);
    
    const xScale = scaleBand()
        .domain(domainDays)
        .range([ margin.left, width - margin.right ])
        .paddingInner(0.1);
    
    const xAxis = axisBottom(xScale)
        .tickFormat(timeFormat("%a %d"))
        .tickSizeOuter(0);
    
    const today = new Date();
    
    const yScale = scaleTime()
        .domain([timeDay.floor(today), timeDay.ceil(today)])
        .range([height - margin.bottom, margin.top]);
    
    const yAxis = axisLeft(yScale).tickFormat(timeFormat("%H:%M"));
        
    const colorScale = scaleLinear()
        .domain([0, 1])
        .range(colorRange);
        
    // Creates the rectagles used in the graph
    const rects = props.dataPoints.map( (point, index) =>{
        const startTime = new Date(point.startTime);
        const stopTime = new Date(point.stopTime);
        const xPosition = xScale(timeDay.floor(startTime));
        today.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), 0);
        const yStartPosition = yScale(today);
        today.setHours(stopTime.getHours(), stopTime.getMinutes(), stopTime.getSeconds(), 0);
        const yStopPosition = yScale(today);
        let height = yStartPosition - yStopPosition;
        height = Math.ceil(height);
        
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
        <div className="">
            <div className="flex flex-row justify-center mb-5">
                <div 
                style={{width:"320px"}}
                className="flex flex-col">
                    <div className="flex flex-row">
                        <div 
                        className="w-full" 
                        style={{backgroundColor: "#2A00D5", height:"20px"}}>
                        </div>
                        <div
                        className="w-full"
                        style={{backgroundColor: "#63009E", height:"20px"}}>
                        </div>
                        <div
                        className="w-full"
                        style={{backgroundColor: "#A1015D", height:"20px"}}>
                        </div>
                        <div 
                        className="w-full"
                        style={{backgroundColor: "#D80027", height:"20px"}}>
                        </div>
                        <div 
                        className="w-full"
                        style={{backgroundColor: "#FE0002", height:"20px"}}>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h4 className="">low</h4>
                        <h4 className="">High</h4>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center mb-5">
                <svg 
                ref={graph}
                height="95vh"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspecRatio="xMidYMid meet">
                    <clipPath id="dataClip">
                        <rect 
                            x="0"
                            y="0"
                            width={width} 
                            height={height -margin.bottom} />
                    </clipPath>
                    
                    
                    <g ref={yAxisRef} transform={`translate(${margin.left}, 0)`}/>
                    <g clipPath="url(#dataClip)">
                        <g transform={`translate(0, ${y}) scale(1, ${k})`}>
                            {rects}
                        </g>
                    </g>
                    <g ref={xAxisRef} transform={`translate(0, ${height - margin.bottom})`}/>
                </svg>
            </div>
            <div className="flex flex-row justify-center">
                <div className="border-4 border-gray-800 rounded-full">
                    <AudioPlayer audioFile={mp3Link}/>
                </div>
            </div>
        </div>
    );
};

export default Graph;