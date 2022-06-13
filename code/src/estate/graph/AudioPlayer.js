import React, { Fragment, useRef, useEffect, useState} from "react";
import playNextIcon from "./playNextOp.svg";
import playPreviousIcon from "./playPreviousOp.svg";
import playIcon from "./playOp.svg";
import pauseIcon from "./pauseOp.svg";
import speakerIcon from "./speakerOp.svg";

const AudioPlayer = props =>{
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [timeUpdate, setTimeUpdate] = useState(0);
    const [volume, setVolume] = useState(1);
    const [title, setTitle] = useState(undefined);
    const audio = useRef();
    
    const playNextPrevious = delta =>{
        const newIndex = props.index + delta || 0;
        if (newIndex >= 0  && newIndex < props.dataPoints.length){
            console.log(newIndex)
            props.setIndex(newIndex);
        }
    };
    
    const changePlayTime = (event) => {
        audio.current.currentTime = event.target.value;
        setTimeUpdate(event.target.value);
    };
    
    const onTimeUpdate = () => {
        setTimeUpdate(Math.floor(audio.current.currentTime));
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
    
    const volumeChange = event=>{
        audio.current.volume = event.target.value;
        setVolume(event.target.value);
    };
    
    const play = () => {
        isPlaying? audio.current.pause(): audio.current.play();
        if(props.index === undefined) props.setIndex(0);
    };
    
    const onPlay = () => {
        setIsPlaying(true);
    };
    
    const onPause = () => {
        setIsPlaying(false);
    };
    
    useEffect(() =>{
        if (props.index >= 0 && props.index < props.dataPoints.length){
            const audioLink = new URL(props.dataPoints[props.index].mp3Link, `${process.env.REACT_APP_DOMAIN}`);
            audio.current.setAttribute('src', audioLink);
            audio.current.autoplay = true;
            setTitle(new Date(props.dataPoints[props.index].time));
        }
    }, [props.index]);
    
    return(
        <div className="flex flex-col items-center mb-40 ">
            <div className="mb-4 text-lg text-stone-800">
                { title 
                    ?<h3>
                        {title.toLocaleDateString("en-US")} <span> </span>
                        {title.toLocaleTimeString("en-US")}
                    </h3>
                    :<h3>Select a minute from the graph</h3>
                }
            </div>
            <input className="w-72" 
            style={{ 
                background: updateTrack(timeUpdate, duration),  
                border: '0.2px solid #292524',
                borderRadius: '4px',
                height: '10px'
            }}
            type="range" min="0" max={duration} step="1" 
            value={timeUpdate} onChange={ event => changePlayTime(event)}/>
            <p className="mb-6 text-stone-800">
                {convertTime(timeUpdate)}<span> / </span>
                {convertTime(duration)}
            </p>
            <div className="flex justify-between w-52 mb-6">
                <button className="w-10" onClick={() => playNextPrevious(-1)}>
                    <img src={playPreviousIcon} alt="Play Previous"/>
                </button>
                <button className="w-10" onClick={play}>
                    {isPlaying
                        ?<img src={pauseIcon} alt="Pause"/>
                        :<img src={playIcon} alt="Play"/>
                    }
                </button>
                <button className="w-10" onClick={() => playNextPrevious(1)}>
                    <img src={playNextIcon} alt="Play Next"/>
                </button>
            </div>
            <div className="flex items-center -ml-6">
                <img className="w-6 mr-2.5" src={speakerIcon} alt="speaker"/>
                <input className="w-28" 
                style={{ 
                    background: updateTrack(volume, 1),
                    border: '0.2px solid #292524',
                    borderRadius: '4px',
                    height: '10px'  
                }} 
                type="range" min="0" max="1" step="0.1" onChange={ event => volumeChange(event)}/>
            </div>
            <audio ref={audio} onPlay={onPlay} onPause={onPause} 
            onLoadedMetadata={getDuration} onTimeUpdate={onTimeUpdate}>
                <source  type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayer;