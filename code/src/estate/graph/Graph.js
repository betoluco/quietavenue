import React, { useState, useEffect, useRef } from "react";
import {scaleTime, scaleLinear} from "d3-scale";

const Graph = props =>{
  const canvasGraphRef = useRef(null);
  const canvasAxisRef = useRef(null);
  const canvasBackgroundRef = useRef(null);
  let devicePixelRatio =  1;
  const today  = new Date(props.day);
  const nextDay = new Date(today.getTime() + 60 * 60 * 24 * 1000);
  let timeScale = scaleTime().domain([today, nextDay]);
  let loudnessScale = scaleLinear().domain([0, 1]);
  const margin = {bottom: 15, top: 0, left: 12, rigth: 12};
  const playingMinuteYOffset = 12;
  const YAxisOffset = 3
  const middleAxisYPosition = 0.2
  const strongAxisYPosition = 0.5
  const fontSize = '0.75rem sans-serif';
  
  const transformDateToToday = (today, date) =>{
    const dateToTransform = new Date(date);
    dateToTransform.setDate(today.getDate());
    dateToTransform.setMonth(today.getMonth());
    dateToTransform.setFullYear(today.getFullYear());
    return dateToTransform;
  };
  
  useEffect(() =>{
    devicePixelRatio = window.devicePixelRatio;
    const canvasBackground = canvasBackgroundRef.current;
    const ctx = canvasBackground.getContext('2d');
    canvasBackground.width = canvasBackground.clientWidth * devicePixelRatio;
    canvasBackground.height = canvasBackground.clientHeight * devicePixelRatio;
    
    timeScale.range([ 0 + margin.rigth, canvasBackground.width - margin.left]);
    loudnessScale.range([canvasBackground.height - margin.bottom , 0]);
    
    // Day background
    const sunrise = transformDateToToday(today, props.sunrise);
    const sunset = transformDateToToday(today, props.sunset);
    const day =  timeScale(sunset) - timeScale(sunrise);
    const dayGradient = ctx.createLinearGradient(0, loudnessScale(0), 0, 0);
    dayGradient.addColorStop(0, "#ffffcc");
    dayGradient.addColorStop(1, "white");
    ctx.fillStyle = dayGradient;
    ctx.fillRect(timeScale(sunrise), 0, day, loudnessScale(0));
    // Nigth background
    const morningGradient = ctx.createLinearGradient(0, loudnessScale(0), 0, 0);
    morningGradient.addColorStop(0, "#ccccff");
    morningGradient.addColorStop(.9, "white");
    ctx.fillStyle = morningGradient;
    const morning = timeScale(sunrise);
    ctx.fillRect(0, 0, morning, loudnessScale(0));
    ctx.fillStyle = morningGradient;
    const night = canvasBackground.width - timeScale(sunset);
    ctx.fillRect(10, 0, night, 30);
    ctx.fillRect(timeScale(sunset), 0, night, loudnessScale(0));
  }, []);
  
  useEffect(() =>{
    const canvasAxis = canvasAxisRef.current;
    const ctx = canvasAxis.getContext('2d');
    canvasAxis.width = canvasAxis.clientWidth * devicePixelRatio;
    canvasAxis.height = canvasAxis.clientHeight * devicePixelRatio;
    
    timeScale.range([ 0 + margin.rigth, canvasAxis.width - margin.left]);
    loudnessScale.range([canvasAxis.height - margin.bottom , 0]);
    
    //X axis
    const XAxisTicks = timeScale.ticks();
    ctx.font = fontSize;
    ctx.textAlign = "center";
    for ( let i = 0; i < XAxisTicks.length; i++){
      ctx.fillText(
        XAxisTicks[i].getHours() + ":00", 
        timeScale(XAxisTicks[i]), 
        canvasAxis.height);
    }
    
    //Y axis
    ctx.beginPath();
    ctx.moveTo(0, loudnessScale(middleAxisYPosition));
    ctx.lineTo(canvasAxis.width, loudnessScale(middleAxisYPosition));
    ctx.strokeStyle = "#d6d3d1";
    ctx.stroke();
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText("Middle", YAxisOffset, loudnessScale(middleAxisYPosition));
    
    ctx.beginPath();
    ctx.moveTo(0, loudnessScale(strongAxisYPosition));
    ctx.lineTo(canvasAxis.width, loudnessScale(strongAxisYPosition));
    ctx.strokeStyle = "#d6d3d1";
    ctx.stroke();
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText("Strong", YAxisOffset, loudnessScale(strongAxisYPosition));
    
  }, []);
  
  useEffect(() =>{
    const canvasGraph = canvasGraphRef.current;
    const ctx = canvasGraph.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvasGraph.width = canvasGraph.clientWidth * devicePixelRatio;
    canvasGraph.height = canvasGraph.clientHeight * devicePixelRatio;
    ctx.clearRect(0,0, canvasGraph.width, canvasGraph.height);
    
    timeScale.range([ 0 + margin.rigth, canvasGraph.width - margin.left]);
    loudnessScale.range([canvasGraph.height - margin.bottom , 0]);
    
    //payingMinute
    if (props.index !== undefined){
      const playingMinute = new Date(props.graphData[props.index].time);
      let yPossition = loudnessScale(props.graphData[props.index].maxLoudness) - playingMinuteYOffset;
      if ( yPossition < 0){
        yPossition = 10;
      }
      ctx.font = fontSize;
      ctx.textAlign = "center";
      ctx.fillText(
        playingMinute.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        timeScale(playingMinute), 
        yPossition
      );
    }   
    
    //Graph
    for ( let i = 0; i < props.graphData.length; i++ ){ 
      const xPosition = timeScale(new Date(props.graphData[i].time));
      const yLineStart = loudnessScale(props.graphData[i].maxLoudness); 
      const yLineEnd = loudnessScale(0);
      ctx.beginPath();
      ctx.moveTo(xPosition, yLineStart);
      ctx.lineTo(xPosition, yLineEnd);
      
      if (i <= props.index){ ctx.strokeStyle = '#ff0000';}
      else{ctx.strokeStyle = '#000000';}
      ctx.stroke();
    }
  }, [props.index]);
  
  return (
    <div className="relative mb-2 flex flex-col items-center w-full h-28">
      <canvas ref={canvasBackgroundRef} className="absolute w-full h-full z-0"/>
      <canvas ref={canvasAxisRef} className=" absolute w-full h-full z-10"/>
      <canvas ref={canvasGraphRef} className=" absolute w-full h-full z-20"/>
    </div>
  );
};

export default Graph;
