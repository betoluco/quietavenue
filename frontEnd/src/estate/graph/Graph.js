import React, {useLayoutEffect, useRef, useState, Fragment} from "react";
import {scaleTime, scaleLinear} from "d3-scale";

import AudioPlayer from "./AudioPlayer";

const Graph = props =>{
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const dataList = Object.keys(props.audioData);
  const mp3LinksList = dataList.map( day => props.audioData[day].mp3Link);
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
  const margin = {right: 5, bottom: scale * remSize, left: 5};
  const playingMinuteYOffset =6;
  const playingMinuteTopHeight = scale * remSize *0.5;
  // 5 minutes per bar, 288 bar per day plus 1 to avoid white spaces
  const barWidth = 0.1 + svgWidth/288;
  
  const updateElapsedTime = (elapsedTime) =>{
    setElapsedTime(elapsedTime);
    console.log(elapsedTime)
  };
  
  // Y Scale
  const loudnessScale = scaleLinear()
  .domain([0, 1])
  .range([graphHeight - margin.bottom , 0]);
  
  // Ploting
  const ridgeline = dataList.map((day, i) => {
    const today = new Date(day);
    const tomorrow = new Date(day).setHours(24, 0, 0);
    const elapsedBars = []
    const bars = []
    
    // X scale
    const timeScale = scaleTime()
    .domain([today, tomorrow])
    .range([ margin.left, svgWidth - margin.right ]);
    
    // X axis
    const xAxisTicks = timeScale.ticks().map( (tick, index, array) =>{
      let textAnchor = "middle";
      if (index === 0){
        textAnchor = "start";
      }else if (index === array.length -1){
        textAnchor = "end";
      }
      
      return (
        <text 
        key={tick}
        x={timeScale(tick)}
        y={graphHeight} 
        fontSize={`${fontSize}rem`}
        textAnchor={textAnchor}>
          {tick.getHours() + ":00"}
        </text>
      );
    });
    
    props.audioData[day].graphData.forEach( (dataPoints, j) =>{
      const xPosition = timeScale(new Date(dataPoints.time));
      const yPosition = loudnessScale(dataPoints.maxLoudness );
      const heigth = graphHeight - yPosition;
      //if (j <= props.index){ color = '#ff0000'; }
      // 5 minutes per bar 288 bar per graph
      bars.push( <rect
        key={xPosition}
        x={xPosition} 
        y={yPosition} 
        height={heigth - margin.bottom}
        width={barWidth}/>);
    });
    
    const xAxis = <line 
    x1={timeScale(new Date(today))} 
    y1={loudnessScale(0)} 
    x2={timeScale(new Date(tomorrow))}  
    y2={loudnessScale(0)} 
    stroke="black" 
    strokeWidth=".1" />;
    
    const graphTitle = (
      <text 
      y='10'
      fontSize={`${fontSize}rem`}>
        {today.toLocaleDateString("en-US", {weekday: 'short', month: 'short', day: 'numeric'})}
      </text>
    );
    
    const yTranslate = graphHeight * i;
    return (
      <g 
      transform={`translate(0, ${yTranslate})`} 
      key={i}>
        {graphTitle}
        <clipPath id={day}>
          {bars}
        </clipPath>
        <rect 
        x={margin.left} 
        y={0} 
        width={svgWidth - margin.left - margin.right}
        height={graphHeight} 
        fill="url(#barsGrad)"
        clipPath={`url(#${day})`}/>
        {xAxis}
        {xAxisTicks}
      </g>
    );
  });
  
  //playingMinute
  // let playingMinuteText = undefined;
  // if (props.index !== undefined){
  //   let yPossition = loudnessScale(props.graphData[props.index].maxLoudness) - playingMinuteYOffset;
  //   if ( yPossition < 0){
  //     yPossition = playingMinuteTopHeight;
  //   }
  //   playingMinuteText = <text 
  //   x={timeScale(new Date(props.graphData[props.index].time))}
  //   y={yPossition}
  //   fontSize={`${fontSize}rem`}
  //   textAnchor="middle">
  //     {new Date(props.graphData[props.index].time)
  //     .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
  //   </text>;
  // }
  
  const svgHeigh = (graphHeight + margin.bottom) * ridgeline.length
  const xAxisTranslate = graphHeight * ridgeline.length
  
  return (
    <Fragment>
      <h2 className="text-stone-800 text-center max-w-screen-md text-lg sm:text-xl mb-3">
        Audio recorded in the property <br/>
        {new Date(dataList[0])
        .toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric'})}
        <span> - </span>
        {new Date(dataList.at(-1))
        .toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric'})}
      </h2>
      
      <AudioPlayer mp3LinksList={mp3LinksList} updateElapsedTime={updateElapsedTime} />
      
      <svg 
      ref={ref}
      viewBox={`0 0 ${svgWidth} ${svgHeigh}`} 
      className="w-full, mb-2">
        <linearGradient id="barsGrad" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="red" />
          <stop offset="100%" stopColor="#a88080" />
        </linearGradient>
        
        {ridgeline}
        
        {/*{playingMinuteText &&
          playingMinuteText
        }*/}
      </svg>
    </Fragment>
  );
};

export default Graph;