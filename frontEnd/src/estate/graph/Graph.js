import React, {useLayoutEffect, useRef, useState, Fragment} from "react";
import {scaleTime, scaleLinear} from "d3-scale";
import { useSelector, useDispatch} from "react-redux";

import {currentTrackChanged, elapsedTimeUpdated, playingStateChanged}  from "../../playerReducer.js";
import AudioPlayer from "./AudioPlayer";
import XAxis from "./XAxis";

const Graph = props =>{
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [fontSize, setFontSize] = useState(1);
  
  const currentTrack = useSelector( (state) =>
    state.player.currentTrack
  );
  
  const elapsedTime = useSelector( (state) =>
    state.player.elapsedTime
  ); 
  
  const svgWidth = 360;
  const graphHeight = 30;
  
  
  useLayoutEffect(() => {
    // 0.75 is the rem size of tailwind sm font size
    setFontSize(0.75 * svgWidth / ref.current.clientWidth);
  }, []);
  
  const margin = {right: 4, bottom: fontSize, left: 4};
  // 5 minutes per bar, 288 bar per day plus 1 to avoid white spaces
  const barWidth = 0.1 + svgWidth/288;
  
  // onCLick listener
  const onRectClicked = (track, bar) => {
    dispatch(currentTrackChanged(track));
    const currentDay = Object.keys(props.audioData)[track];
    for (let i = bar;  i >= 0; i--){
      if(props.audioData[currentDay].graphData[i].hasOwnProperty("soundStart")){
        dispatch(elapsedTimeUpdated(props.audioData[currentDay].graphData[i].soundStart));
        break;
      }
    }
    dispatch(playingStateChanged(true));
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
        <text x="3" y="7" fontSize={`${fontSize}rem`}>
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
        {i%3 == 0 &&
          <XAxis 
          timeScale={timeScale}
          loudnessScale={loudnessScale}
          height={graphHeight}
          fontSize={fontSize}
          />
        }
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