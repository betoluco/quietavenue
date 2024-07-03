import React, {Fragment, useRef} from "react";
import {scaleTime, scaleLinear} from "d3-scale";

const Graph = props =>{
  const ref = useRef(null);
  const svgWidth = 360;
  const graphHeight = 60;
  const margin = {right: 4, left: 4, };
  
  // 5 minutes per bar, 288 bar per day plus 0.1 to avoid white spaces
  const barWidth = 0.1 + svgWidth/288;
  
  // onCLick listener
  const onRectClicked = (track, bar) => {
    props.setCurrentTrack(track);
    const currentDay = props.daysList[track];
    for (let i = bar;  i >= 0; i--){
      if(props.audioData[currentDay].graphData[i].hasOwnProperty("soundStart")){
        props.setElapsedTime(props.audioData[currentDay].graphData[i].soundStart);
        break;
      }
    }
  };
  
  // Y Scale
  const loudnessScale = scaleLinear().domain([0, 1]).range([0, graphHeight]);
  
  // Color Scale
  const colorScale = scaleLinear().domain([0, 1]).range(["#c9939b", "red"]);
  
  //Looping through the days
  const ridgeline = props.daysList.map((day, i) => {
    const today = new Date(day);
    const tomorrow = new Date(day).setHours(24, 0, 0);
    
    // X scale
    const timeScale = scaleTime()
    .domain([today, tomorrow])
    .range([ margin.left, svgWidth - margin.right ]);
    
    let currentIndex = undefined;
    if (props.currentTrack === i){
      props.audioData[day].graphData.forEach( (dataPoint, i) => {
        if(dataPoint.hasOwnProperty("soundStart") &&
        dataPoint.soundStart < props.elapsedTime){
          currentIndex = i;
        }
      });
    }
    
    // Looping through the graph data
    let currentMinute = null;
    const bars = props.audioData[day].graphData.map( (dataPoint, j) =>{
      const height = loudnessScale(dataPoint.maxLoudness);
      const yPosition = (graphHeight - height) / 2;
      const xPosition = timeScale(new Date(dataPoint.time));
      let fillColor = colorScale(dataPoint.maxLoudness);
      if(props.currentTrack === i && j <= currentIndex){
        fillColor="#166534";
        if(j === currentIndex){
          // 0.75 is the rem size of tailwind sm font size
          const fontSize = 0.75 * (svgWidth / ref.current.clientWidth);
          currentMinute = <text 
          fontSize={`${fontSize}rem`}
          textAnchor="middle"
          x={xPosition} 
          y="20">
            {new Date(dataPoint.time)
            .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </text>;
        }
      } 
      return <rect onClick={() => onRectClicked(i, j)}
        key={dataPoint.time}
        x={xPosition} 
        y={yPosition} 
        height={height}
        width={barWidth}
        fill={fillColor}/>; 
    });
    
    return (
      <div key={i} className="w-full h-full mt-4">
        <h5 className="text-stone-800 text-xs relative -mb-4 ml-3">
          {today.toLocaleDateString("en-US", {weekday: 'short', day: 'numeric'})}
        </h5>
        <svg viewBox={`0 0 ${svgWidth} ${graphHeight}`} ref={ref}>
          {props.currentTrack === i &&
            <rect x="0" y="0" height={graphHeight} 
            width={svgWidth} rx="4" fill="#d4d4d4"/>
          }
          {bars}
          {currentMinute}
        </svg>
        {/*
        <rect x={margin.left} y={0} width={svgWidth - margin.left - margin.right}
        height={graphHeight} fill="url(#barsGrad)"clipPath={`url(#${day})`}/>
        */}
        {i%2 == 0 &&
        <div className="w-full flex justify-between">
          <h5 className="text-stone-800 text-xs">0:00</h5>
          <h5 className="text-stone-800 text-xs">8:00</h5>
          <h5 className="text-stone-800 text-xs">16:00</h5>
          <h5 className="text-stone-800 text-xs">24:00</h5>
        </div>
        }
      </div>
    );
  });
  
  
  return (
    <Fragment>
      {ridgeline}
    </Fragment>
  );
};

export default Graph;