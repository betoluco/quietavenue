import React, {useRef, useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";

import {currentTrackChanged, elapsedTimeUpdated, playingStateChanged}  from "../../playerReducer.js";
import playIcon from "./playOp.svg";
import pauseIcon from "./pauseOp.svg";
import playNextIcon from "./playNextOp.svg";
import playPreviousIcon from "./playPreviousOp.svg";

const AudioPlayer = props =>{
    const dispatch = useDispatch();
    const [duration, setDuration] = useState(0);
    const audio = useRef();
    
    const currentTrack= useSelector( (state) =>
        state.player.currentTrack
    );
    
    const elapsedTime = useSelector( (state) =>
        state.player.elapsedTime
    );
    
    const isPlaying = useSelector( (state) =>
        state.player.isPlaying
    );
    
    useEffect(() =>{
        return () => {
            dispatch(elapsedTimeUpdated(0));
            dispatch(currentTrackChanged(0));
        };
    }, []);
    
    useEffect(() =>{
        audio.current.setAttribute('src', 'https://d3d6un1tjol792.cloudfront.net' + mp3LinksList[currentTrack]);
    }, [currentTrack]);
    
    const daysList = Object.keys(props.audioData);
    const mp3LinksList = daysList.map( day => props.audioData[day].mp3Link);
    
    const getDateString = currentTrack =>{
        return new Date(daysList[currentTrack]).toLocaleDateString(
            "en-US",
            {weekday: 'short', month: 'short', day: 'numeric'}
        );
    };
    
    const previousDay = daysList[currentTrack - 1] != undefined? 
    getDateString(currentTrack - 1) 
    :null;
    const currentDay = getDateString(currentTrack);
    const nextDay = daysList[currentTrack + 1] != undefined? 
    getDateString(currentTrack + 1) 
    :null;
    
    const changePlayTime = (event) => {
        audio.current.currentTime = event.target.value;
        dispatch(elapsedTimeUpdated(event.target.value));
    };
    
    const onTimeUpdate = () => {
        if(Math.floor(audio.current.currentTime) !== Math.floor(elapsedTime))
            if(audio.current.networkState === 3){
                audio.current.currentTime = elapsedTime;
                if(isPlaying) audio.current.play();
            }else{
                dispatch(elapsedTimeUpdated(audio.current.currentTime)); // 3 = NETWORK_NO_SOURCE, when changing source
            }
    };
    
    const updateProgressBar = (trackProgress, max) =>{
        const currentPercentage = `${(trackProgress / max) * 100}%`;
        return `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #a8a29e), 
        color-stop(${currentPercentage}, #fff))`;
    };
    
    const changeTrack = (index) =>{
        if(mp3LinksList[currentTrack + index] != undefined )
            dispatch(currentTrackChanged(currentTrack + index));
            if(isPlaying) audio.current.play();
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
        dispatch(playingStateChanged(true));
    };
    
    const onPause = () => {
        dispatch(playingStateChanged(false));
    };
    
    return(
        <div className="sticky top-0 pt-3 flex flex-col items-center w-full mb-4 bg-white">
            <div className="w-full flex justify-center mb-3">
                <button onClick={() => changeTrack(-1)} className="w-10 " >
                    <img src={playPreviousIcon} alt="Play Previous"/>
                </button>
                <button 
                className="w-12 mx-16"
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
            <div className="grid gap-10 grid-cols-3 grid-rows-1 items-center mb-3">
                <p className="text-xs text-right">{previousDay}</p>
                <p className="font-medium">{currentDay}</p>
                <p className="text-xs text-left">{nextDay}</p>
            </div>
            <div className="w-full flex">
                <input 
                className="w-full" 
                style={{ 
                    background: updateProgressBar(elapsedTime, duration),  
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