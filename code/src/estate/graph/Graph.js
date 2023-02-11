import React, { useState, useEffect, useRef } from "react";
import {scaleTime, scaleLinear} from "d3-scale";


const Graph = props =>{
  const [index, setIndex] = useState(undefined);
  
  const canvasRef = useRef(null);
  const today  = new Date(props.day);
  const nextDay = new Date(today.getTime() + 60 * 60 * 24 * 1000);
  const margin = {bottom: 15, top: 0, left: 12, rigth: 12};
  const ticksOffset = 12;
  
  const transformDateToToday = (today, date) =>{
    const dateToTransform = new Date(date);
    dateToTransform.setDate(today.getDate());
    dateToTransform.setMonth(today.getMonth());
    dateToTransform.setFullYear(today.getFullYear());
    return dateToTransform;
  };
  
  useEffect(() =>{
    if (props.elapsedTime > 0){
      for ( let i = 0; i < props.graphData.length-1; i++ ){
        if (props.graphData[i].hasOwnProperty("sound_start")){
          if (props.graphData[i].sound_start < props.elapsedTime && 
          props.elapsedTime< props.graphData[i].sound_end){
            setIndex(i);
            break;
          }
        }
      }
    }else{
      setIndex(undefined);
    }
  }, [props.elapsedTime]);
    
  useEffect(() =>{
    
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
    
    const timeScale = scaleTime()
      .domain([today, nextDay])
      .range([ 0 + margin.rigth, canvas.width - margin.left]);
    
    const loudnessScale = scaleLinear()
      .domain([0, 1]) 
      .range([canvas.height - margin.bottom , 0]);
    
    //x axis
    const ticks = timeScale.ticks();
    for ( let i = 0; i < ticks.length; i++){
      ctx.font = "12px Arial";
      ctx.fillText(
        ticks[i].getHours() + ":00", 
        timeScale(ticks[i]) - ticksOffset, 
        canvas.height);
    }
    
    // background
    const sunrise = transformDateToToday(today, props.sunrise);
    const sunset = transformDateToToday(today, props.sunset);
    const day =  timeScale(sunset) - timeScale(sunrise);
    //const night 
    const dayGradient = ctx.createLinearGradient(0, loudnessScale(0), 0, 0);
    dayGradient.addColorStop(0, "#ffffcc");
    dayGradient.addColorStop(1, "white");
    ctx.fillStyle = dayGradient;
    ctx.fillRect(timeScale(sunrise), 0, day, loudnessScale(0));
    const morning = timeScale(sunrise);
    var morningGradient = ctx.createLinearGradient(0, loudnessScale(0), 0, 0);
    morningGradient.addColorStop(0, "#ccccff");
    morningGradient.addColorStop(.8, "white");
    ctx.fillStyle = morningGradient;
    ctx.fillRect(0, 0, morning, loudnessScale(0));
    const night = canvas.width - timeScale(sunset);
    ctx.fillRect(timeScale(sunset), 0, night, loudnessScale(0));
    
    
    
    //Draw the graph
    for ( let i = 0; i < props.graphData.length; i++ ){ 
      const xPosition = timeScale(new Date(props.graphData[i].time));
      const yLineStart = loudnessScale(props.graphData[i].maxLoudness); 
      const yLineEnd = loudnessScale(0);
      
      ctx.beginPath();
      ctx.moveTo(xPosition, yLineStart);
      ctx.lineTo(xPosition, yLineEnd);
      
      if (i <= index){
        ctx.strokeStyle = '#ff0000';
      }else{
        ctx.strokeStyle = '#000000';
      }
      
      ctx.stroke();
    }
  }, [index]);
  
  return (
    <div className="mb-5 flex flex-col items-center w-full">
      <canvas ref={canvasRef} className="w-full h-28"/>  
    </div>
  );
};

export default Graph;