import React, { useRef, useEffect, useState } from "react";
import { scaleBand, scaleTime, scaleLinear} from "d3-scale";
import { timeDay } from "d3-time";
import { axisBottom, axisLeft} from "d3-axis";
import { select, pointers } from "d3-selection";
import { timeFormat } from "d3-time-format";
import { Transform } from "d3-zoom/src/transform";

import AudioPlayer from "./stateless/AudioPlayer";
import ColorScale from "./stateless/ColorScale";

const Graph = props =>{
  const margin = { top: 10, right: 10, bottom: 35, left: 98},
  width = 843, //16:9 screen ratio
  height = 1500,
  colorRange = ["#005bab", "#ff1100"];
  
  const xAxisRef = useRef();
  const yAxisRef = useRef();
  const graph = useRef();

  const [dragging, setDragging] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [mp3Link, setmp3Link] = useState("");
  
  
  const onClickHandler = (link) =>{
    setmp3Link(link);
  };
  
  // const onMouseDownHandler = (event) =>{
  //   console.log("mouseDown")
  //   // Record our starting point.
  //   setOrigin({ x: event.clientX, y: event.clientY });
  //   setDragging(true);
  // };
  
  // const onMouseMoveHandler = (event) =>{
  //   if (dragging) {
  //     // Set state for the change in coordinates.
  //     setCoordinates({
  //       x: event.clientX - origin.x,
  //       y: event.clientY - origin.y,
  //     });
      
  //     const transform = new Transform(1, 0, coordinates.y);
  //     select(yAxisRef.current).call(yAxis.scale(transform.rescaleY(yScale)));
  //   }
  // };
  
  // const onMouseUpHandler = (event) =>{
  //   setDragging(false);
  // };
  
  useEffect(() =>{
    select(xAxisRef.current)
    .style("font-size","1.4rem")
    .call(xAxis);

    select(yAxisRef.current)
    .style("font-size","1.7rem")
    .call(yAxis);
    
    select(graph.current)
    .on("mousedown touchstart", (event) => {
      event.preventDefault();
      const t = pointers(event);
      setOrigin({ x:t[0], y:t[1] });
      setDragging(true);
    })
    .on("mouseup touchend", (event) => {
      event.preventDefault();
      setDragging(false);
    })
    .on("mousemove", (event) => {
      console.log("MouseMove", dragging)
      if (dragging) {
        const t = pointers(event);
        console.log(t)
        setCoordinates({
          x: t[0] - origin.x,
          y: t[1] - origin.y,
        });
        
        const transform = new Transform(1, 0, coordinates.y);
        select(yAxisRef.current).call(yAxis.scale(transform.rescaleY(yScale)));
      }
    })
  }, []);
  
  const colorScale = scaleLinear()
    .domain([0, 1])
    .range(colorRange);
      
  const firstDay = timeDay.floor(new Date(props.dataPoints[0].time));
  const lastDay = timeDay.ceil(new Date(props.dataPoints[props.dataPoints.length - 1].time));
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
  
  // Creates the rectagles used in the graph
  const rects = props.dataPoints.map( (point, index) =>{
    const time = new Date(point.time);
    const xPosition = xScale(timeDay.floor(time));
    today.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), 0);
    const yPosition = yScale(today);
      
    if(mp3Link === point.mp3Link){
      return <rect 
      key={point.mp3Link}
      width={xScale.bandwidth()}
      height="1"
      x={xPosition}
      y={yPosition}
      fill="green"/>;
      
    }else{
      return <rect 
      key={point.mp3Link}
      width={xScale.bandwidth()}
      height="1"
      x={xPosition}
      y={yPosition}
      fill={colorScale(point.maxLoudness)}
      onClick={() => onClickHandler(point.mp3Link)}
      />;
    }
  });
  
  return (
    <div className="">
      <ColorScale />
      {/*<div className="border-4 border-gray-800 rounded-full -mb-40">
          <AudioPlayer audioFile={mp3Link}/>
      </div>*/}
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
              <g transform={`translate(0, ${coordinates.y}) scale(1, ${k})`}>
                {rects}
              </g>
            </g>
          <g ref={xAxisRef} transform={`translate(0, ${height - margin.bottom})`}/>
        </svg>
      </div>
    </div>
  );
};

export default Graph;