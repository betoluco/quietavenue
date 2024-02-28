import React, {useRef, useEffect, useState} from "react";

import playIcon from "./playOp.svg";
import pauseIcon from "./pauseOp.svg";
import playNextIcon from "./playNextOp.svg";
import playPreviousIcon from "./playPreviousOp.svg";

const AudioPlayer = props =>{
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(0);
    const audio = useRef();
    
//    useEffect(() =>{
//     let currentIndex
//     if (elapsedTime > 0){
//       for ( let i = 0; i < props.graphData.length-1; i++ ){
//         if (props.graphData[i].hasOwnProperty("soundStart")){
//           if (props.graphData[i].soundStart < elapsedTime){
//             currentIndex = i;
//           }
//         }
//       }
//       setIndex(currentIndex);
//     }else{
//       setIndex(undefined);
//     }
//   }, [elapsedTime]);
    
    useEffect(() =>{
        props.updateElapsedTime(elapsedTime)
    }, [elapsedTime]);
    
    useEffect(() =>{
        audio.current.setAttribute('src', 'd3d6un1tjol792.cloudfront.net' + props.mp3LinksList[currentTrack]);
    }, []);
    
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
    
    const changeTrack = (index) =>{
        if(currentTrack + index < props.mp3LinksList.length && currentTrack + index >= 0 ){
            setCurrentTrack(currentTrack + index);
        }
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
    
    return(
        <div className="sticky top-0 pt-3 flex flex-col items-center w-full mb-4 bg-white">
            <div className="w-full flex justify-center mb-3">
                <button onClick={() => changeTrack(-1)} className="w-10 mr-4" >
                    <img src={playPreviousIcon} alt="Play Previous"/>
                </button>
                <button 
                className="w-12 mr-4"
                onClick={play}>
                    {isPlaying
                        ?<img src={pauseIcon} alt="Pause"/>
                        :<img           src={playIcon} alt="Play"/>
                    }
                </button>
                <button onClick={() => changeTrack(1)} className="w-10">
                    <img src={playNextIcon} alt="Play Next"/>
                </button>
            </div>
            <div className="w-full flex">
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
                <p className="text-stone-800 text-xs">
                    <span>{convertTime(Math.floor(elapsedTime))}</span>
                    <span> / </span>
                    <span>{convertTime(duration)}</span>
                </p>
            </div>
            <audio ref={audio} onPlay={onPlay} onPause={onPause} 
            onLoadedMetadata={getDuration} onTimeUpdate={onTimeUpdate}>
                <source type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayer;