import React, {useLayoutEffect,  useRef, useState} from "react";
import {scaleTime, scaleLinear} from "d3-scale";

const Graph = props =>{
  const ref = useRef(null);
  const [width, setWidth] = useState(1);
  
  const margin = { top:0, right: 15, bottom: 12, left: 30};
  const height = 120;
  const today  = new Date(props.day);
  const nextDay = new Date(today.getTime() + 60 * 60 * 24 * 1000);
  const fontSize = "11px";
  const middleAxisYPosition = 0.2;
  const strongAxisYPosition = 0.5;
  const yAxisLineSpace = 3;
  const yAxisIndentation = 3;
  const playingMinuteYOffset = 12;
  const playingMinuteTopHeight = 10;
  const oneHour = 60 * 60 * 1000;
  const strokeWidth = "1";
  
  useLayoutEffect(() =>{
    setWidth(ref.current.clientWidth);
  });
  
  // X scale
  const timeScale = scaleTime()
  .domain([today, nextDay])
  .range([ 0 + margin.left, width - margin.right ]);
  
  // X axis
  const xAxis = timeScale.ticks().map( tick =>{
    return (
      <text 
      key={tick}
      x={timeScale(tick)}
      y={height} 
      fontSize={fontSize}
      textAnchor="middle">
        {tick.getHours() + ":00"}
      </text>
    );
  });
  
  // Y Scale
  const loudnessScale = scaleLinear()
  .domain([0, 1])
  .range([height - margin.bottom , 0]);
  
  const bars = props.graphData.map( (dataPoints, i) =>{
    const xPosition = timeScale(new Date(dataPoints.time));
    const yLineStart = loudnessScale(dataPoints.maxLoudness); 
    const yLineEnd = loudnessScale(0);
    let color = '#000000';
    if (i <= props.index){ color = '#ff0000'; }
    return <line 
      key={xPosition}
      x1={xPosition} 
      y1={yLineStart} 
      x2={xPosition}
      y2={yLineEnd} 
      shapeRendering="crispEdges"
      strokeWidth={strokeWidth}
      stroke={color}/>;
  });
  
  //payingMinute
  let playingMinuteText = undefined;
  if (props.index !== undefined){
    let yPossition = loudnessScale(props.graphData[props.index].maxLoudness) - playingMinuteYOffset;
    if ( yPossition < 0){
      yPossition = playingMinuteTopHeight;
    }
    playingMinuteText = <text 
    x={timeScale(new Date(props.graphData[props.index].time))}
    y={yPossition}
    fontSize={fontSize}
    textAnchor="middle">
      {new Date(props.graphData[props.index].time)
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </text>;
  }
  const transformDateToToday = (today, date) =>{
    const dateToTransform = new Date(date);
    dateToTransform.setDate(today.getDate());
    dateToTransform.setMonth(today.getMonth());
    dateToTransform.setFullYear(today.getFullYear());
    return dateToTransform;
  };
 
  // background
  const sunrise = transformDateToToday(today, props.sunrise);
  const sunriseStart = new Date(sunrise.getTime() - oneHour ); 
  const sunriseEnd = new Date(sunrise.getTime() + oneHour ); 
  const dayStart =  new Date(sunriseEnd.getTime() + oneHour );
  const sunset = transformDateToToday(today, props.sunset);
  const sunsetStart = new Date(sunset.getTime() - oneHour ); 
  const sunsetEnd = new Date(sunset.getTime() + oneHour );
  const dayEnd =  new Date(sunsetStart.getTime() - oneHour );
    
  return (
    <svg ref={ref} className="mb-3 w-full h-28" style={{height:`${height}px`}}>
      <defs>
        <linearGradient id="background" x2={width} y2="0" gradientUnits="userSpaceOnUse">
          <stop 
          offset={timeScale(sunriseStart)/width * 100 + "%"} 
          stopColor="#cce6ff" />
          <stop 
          offset={timeScale(sunrise)/width * 100 + "%"} 
          stopColor="#ffcccc" />
          <stop 
          offset={timeScale(sunriseEnd)/width * 100 + "%"} 
          stopColor="#ffe6cc" />
          <stop 
          offset={timeScale(dayStart)/width * 100 + "%"} 
          stopColor="#ffffcc" />
          <stop 
          offset={timeScale(dayEnd)/width * 100 + "%"} 
          stopColor="#ffffcc" />
          <stop 
          offset={timeScale(sunsetStart)/width * 100 + "%"} 
          stopColor="#ffe6cc" />
          <stop 
          offset={timeScale(sunset)/width * 100 + "%"} 
          stopColor="#ffcccc" />
          <stop 
          offset={timeScale(sunsetEnd)/width * 100 + "%"} 
          stopColor="#cce6ff" />
        </linearGradient>
        <linearGradient id="fade" x2="0" y2={height - margin.bottom} gradientUnits="userSpaceOnUse">
          <stop offset="10%" stopColor="white" />
          <stop offset="100%" stopColor="white" stopOpacity="0%"/>
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width={width}
        height={height - margin.bottom}
        fill="url(#background)" />
      {/* -1 , +2 eliminates an undesirable margin on the sides */}
      <rect
        x="-1" 
        y="-1"
        width={width + 2} 
        height={height - margin.bottom}
        fill="url(#fade)" />
      <line 
      x1="0" 
      y1={loudnessScale(strongAxisYPosition)} 
      x2={width} 
      y2={loudnessScale(strongAxisYPosition)}
      shapeRendering="crispEdges"
      stroke="black"/>
      {playingMinuteText &&
        playingMinuteText
      }
      {bars}
      <text 
      x={yAxisIndentation} 
      y={loudnessScale(strongAxisYPosition) - yAxisLineSpace} 
      fontSize={fontSize}>
        Strong
      </text>
      <line 
      x1="0" 
      y1={loudnessScale(middleAxisYPosition)} 
      x2={width} 
      y2={loudnessScale(middleAxisYPosition)}
      shapeRendering="crispEdges"
      stroke="black"/>
      {playingMinuteText &&
        playingMinuteText
      }
      <text 
      x={yAxisIndentation} 
      y={loudnessScale(middleAxisYPosition) - yAxisLineSpace} 
      fontSize={fontSize}>
        Middle
      </text>
      {bars}
      {xAxis}
    </svg>
  );
};

export default Graph;