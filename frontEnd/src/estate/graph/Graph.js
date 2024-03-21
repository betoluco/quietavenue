import React, {useLayoutEffect, useRef, useState, Fragment} from "react";
import {scaleTime, scaleLinear} from "d3-scale";
import { useSelector, useDispatch} from "react-redux";

import {elapsedTimeUpdated}  from "../../estatesReducer.js";
import AudioPlayer from "./AudioPlayer";
import XAxis from "./XAxis";

const Graph = props =>{
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  
  const currentTrack = useSelector( (state) =>
    state.estates.currentTrack
  );
  
  const elapsedTime = useSelector( (state) =>
    state.estates.elapsedTime
  ); 
  
  const svgWidth = 260;
  const graphHeight = 50;
  
  //scale is used to size the text
  let remSize = 16;
  useLayoutEffect(() => {
    setScale(svgWidth / ref.current.clientWidth);
    // gets the root
    remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  }, []);
  
  // 0.75 is the rem size of tailwind sm font size
  //mutiply rem size for the scale to get corret size
  const fontSize =  0.75 * scale;
  const margin = {right: 4, bottom: scale * remSize, left: 4};
  // 5 minutes per bar, 288 bar per day plus 1 to avoid white spaces
  const barWidth = 0.1 + svgWidth/288;
  
  // onCLick listener
  const onRectClicked = (track, bar) => {
    const currentDay = Object.keys(props.audioData)[track];
    for (let i = bar;  i >= 0; i--){
      if(props.audioData[currentDay].graphData[i].hasOwnProperty("soundStart")){
        dispatch(elapsedTimeUpdated(props.audioData[currentDay].graphData[i].soundStart));
        break;
      }
    }
  };
  
  // Y Scale
  const loudnessScale = scaleLinear()
  .domain([0, 1])
  .range([0, graphHeight - margin.bottom]);
  
  // Color Scale
  const colorScale = scaleLinear()
  .domain([0, 1])
  .range(["#c9939b", "red"]);
  
  //Looping through the days
  const ridgeline = Object.keys(props.audioData).map((day, i) => {
    const today = new Date(day);
    const tomorrow = new Date(day).setHours(24, 0, 0);
    
    // X scale
    const timeScale = scaleTime()
    .domain([today, tomorrow])
    .range([ margin.left, svgWidth - margin.right ]);
    
    //Highlight current graph
    const graphHighlight = currentTrack === i?
    <rect x="0" y="0" height={graphHeight - margin.bottom } width={svgWidth} rx="4" fill="#d4d4d4"/>     
    :null;
    
    let currentIndex = undefined;
    if (currentTrack === i){
      props.audioData[day].graphData.forEach( (dataPoint, i) => {
        if(dataPoint.hasOwnProperty("soundStart") &&
        dataPoint.soundStart < elapsedTime){
          currentIndex = i;
        }
      });
    }
    
    // Looping through the graph data
    let currentMinute = null;
    const bars = props.audioData[day].graphData.map( (dataPoint, j) =>{
      const height = loudnessScale(dataPoint.maxLoudness);
      const yPosition = (graphHeight - height - margin.bottom) / 2;
      const xPosition = timeScale(new Date(dataPoint.time));
      let fillColor = colorScale(dataPoint.maxLoudness);
      if(currentTrack === i && j <= currentIndex){
        fillColor="#166534";
        if(j === currentIndex){
          currentMinute = <text 
          fontSize={`${fontSize}rem`}
          textAnchor="middle"
          x={xPosition} 
          y={yPosition}>
            {new Date(dataPoint.time)
            .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </text>;
        }
      } 
      return <rect
        onClick={() => onRectClicked(i, j)}
        key={dataPoint.time}
        x={xPosition} 
        y={yPosition} 
        height={height}
        width={barWidth}
        fill={fillColor}/>; 
    });
    
    
    const yTranslate = graphHeight * i;
    return (
      <g transform={`translate(0, ${yTranslate})`} key={i}>
        {graphHighlight}
        <text x="3" y='10' fontSize={`${fontSize}rem`}>
        {today.toLocaleDateString("en-US", {weekday: 'short', month: 'short', day: 'numeric'})}
        </text>
        {bars}
        <rect 
        x={margin.left} 
        y={0} 
        width={svgWidth - margin.left - margin.right}
        height={graphHeight} 
        fill="url(#barsGrad)"
        clipPath={`url(#${day})`}/>
        {currentMinute}
        <XAxis 
        timeScale={timeScale}
        loudnessScale={loudnessScale}
        height={graphHeight}
        fontSize={fontSize}
        />
      </g>
    );
  });
  
  const svgHeigh = (graphHeight + margin.bottom) * ridgeline.length;
  
  return (
    <Fragment>
      <h2 className="text-stone-800 text-center max-w-screen-md text-lg sm:text-xl mb-3">
        Audio recorded in the property <br/>
        {new Date(Object.keys(props.audioData)[0])
        .toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'})}
        <span> - </span>
        {new Date(Object.keys(props.audioData).at(-1))
        .toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'})}
      </h2>
      
      <AudioPlayer audioData={props.audioData} />
      
      <svg 
      ref={ref}
      viewBox={`0 0 ${svgWidth} ${svgHeigh}`} 
      className="w-full, mb-2">
        {ridgeline}
      </svg>
    </Fragment>
  );
};

export default Graph;