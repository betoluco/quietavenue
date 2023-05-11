import React, {useRef, useEffect, useState} from "react";
import playIcon from "./playOp.svg";
import pauseIcon from "./pauseOp.svg";
import Graph from "./Graph";

const AudioPlayer = props =>{
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [index, setIndex] = useState(undefined);
    const audio = useRef();
    
    useEffect(() =>{
    let currentIndex
    if (elapsedTime > 0){
      for ( let i = 0; i < props.graphData.length-1; i++ ){
        if (props.graphData[i].hasOwnProperty("soundStart")){
          if (props.graphData[i].soundStart < elapsedTime){
            currentIndex = i;
          }
        }
      }
      setIndex(currentIndex);
    }else{
      setIndex(undefined);
    }
  }, [elapsedTime]);
    
    const changePlayTime = (event) => {
        audio.current.currentTime = event.target.value;
        setElapsedTime(event.target.value);
    };
    
    const onTimeUpdate = () => {
        setElapsedTime(audio.current.currentTime);
    };
    
    const updateTrack = (trackProgress, max) =>{
        const currentPercentage = `${(trackProgress / max) * 100}%`;
        return `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #a8a29e), 
        color-stop(${currentPercentage}, #fff))`;
    };
    
    const getDuration = () =>{
        setDuration(Math.floor(audio.current.duration));
    };
    
    const convertTime = time =>{
        const minutes = Math.floor(time / 60);
        const seconds = (time % 60).toString().padStart(2, "0");
        return (`${minutes}:${seconds}`);
    };
    
    const play = () => {
        isPlaying? audio.current.pause(): audio.current.play();
    };
    
    const onPlay = () => {
        setIsPlaying(true);
    };
    
    const onPause = () => {
        setIsPlaying(false);
    };
    
    useEffect(() =>{
        const audioLink = new URL(props.mp3Link, `${process.env.REACT_APP_DOMAIN}`);
        audio.current.setAttribute('src', audioLink);
    }, []);
    
    
    return(
        <div className="flex flex-col items-center w-full mb-4">
            <Graph
            index={index}
            graphData={props.graphData}
            sunrise={props.sunrise}
            sunset={props.sunset}
            day={props.day}/>
            
            <div className="w-full flex items-center">
                <button 
                className="w-12 mr-3" 
                data-cy="playButton"
                onClick={play}>
                    {isPlaying
                        ?<img data-cy="pauseIcon" src={pauseIcon} alt="Pause"/>
                        :<img data-cy="playIcon" src={playIcon} alt="Play"/>
                    }
                </button>
                
                <input 
                className="w-full" 
                style={{ 
                    background: updateTrack(elapsedTime, duration),  
                    border: '0.2px solid #292524',
                    borderRadius: '4px',
                    height: '10px'
                }}
                type="range" min="0" max={duration} step="1" 
                value={elapsedTime} onChange={ event => changePlayTime(event)}/>
            </div> 
            
            <div className="w-full flex justify-end">
                <p className="text-stone-800 text-xs -mt-3">
                    {convertTime(Math.floor(elapsedTime))}<span> / </span>
                    {convertTime(duration)}
                </p>
            </div>
            <audio ref={audio} onPlay={onPlay} onPause={onPause} 
            onLoadedMetadata={getDuration} onTimeUpdate={onTimeUpdate}>
                <source  type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            <h5 className="text-stone-800 text-center max-w-screen-md text-lg">
                {new Date(props.day).toLocaleDateString("en-US", {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'})}
            </h5>
        </div>
    );
};

export default AudioPlayer;