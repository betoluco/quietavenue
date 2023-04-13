import React, {useLayoutEffect, useRef, useState} from "react";
import {scaleTime, scaleLinear} from "d3-scale";

const Graph = props =>{
  const ref = useRef(null);
  
  const [clientWidth, setClientWidth] = useState(2560);
  let remSize = 16
  
  useLayoutEffect(() => {
    setClientWidth(ref.current.clientWidth);
    // gets the root 
    remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  }, []);
  
  const today  = new Date(props.day);
  const nextDay = new Date(today.getTime() + 60 * 60 * 24 * 1000);
  const width = 2560;
  const height = 1000;
  const scale = width / clientWidth;
  // 0.75 is the rem size of tailwind sm font size
  //mutiply rem size for the scale to get corret size
  const fontSize =  0.75 * scale;
  const margin = { top:0, right: 10, bottom: scale * remSize, left: 10};
  const middleAxisYPosition = 0.2;
  const strongAxisYPosition = 0.5;
  const yAxisLineSpace = 3;
  const yAxisIndentation = 3;
  const playingMinuteYOffset =6;
  const playingMinuteTopHeight = scale * remSize *0.5;
  const transitionTime =20 * 60 * 1000;
  
  // X scale
  const timeScale = scaleTime()
  .domain([today, nextDay])
  .range([ 0 + margin.left, width - margin.right ]);
  
  // X axis
  const xAxis = timeScale.ticks().map( (tick, index, array) =>{
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
      y={height} 
      fontSize={`${fontSize}rem`}
      textAnchor={textAnchor}>
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
      strokeWidth="2"
      shapeRendering="crispEdges"
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
    fontSize={`${fontSize}rem`}
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
  const nightEnd = new Date(sunrise.getTime() - transitionTime ); 
  const dayStart =  new Date(sunrise.getTime() + transitionTime );
  const sunset = transformDateToToday(today, props.sunset);
  const dayEnd =  new Date(sunset.getTime() - transitionTime );
  const nightStart = new Date(sunset.getTime() + transitionTime );
  
    
  return (
    <svg 
    ref={ref}
    viewBox={`0 0 ${width} ${height}`} 
    className="mb-3 w-full">
      <defs>
        <linearGradient id="background" x2={width} y2="0" gradientUnits="userSpaceOnUse">
          <stop 
          offset={timeScale(nightEnd)/width * 100 + "%"} 
          stopColor="#66b3ff" />
          <stop 
          offset={timeScale(sunrise)/width * 100 + "%"} 
          stopColor="#ffffff" />
          <stop 
          offset={timeScale(dayStart)/width * 100 + "%"} 
          stopColor="#ffff99" />
          <stop 
          offset={timeScale(dayEnd)/width * 100 + "%"} 
          stopColor="#ffff99" />
          <stop 
          offset={timeScale(sunset)/width * 100 + "%"} 
          stopColor="#ffffff" />
          <stop 
          offset={timeScale(nightStart)/width * 100 + "%"} 
          stopColor="#66b3ff" />
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
      <text 
      x={yAxisIndentation} 
      y={loudnessScale(strongAxisYPosition) - yAxisLineSpace} 
      fontSize={`${fontSize}rem`}>
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
      fontSize={`${fontSize}rem`}>
        Middle
      </text>
      {bars}
      {xAxis}
    </svg>
  );
};

export default Graph;