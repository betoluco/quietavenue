import React, { Fragment, useRef, useEffect, useState} from "react";
import playNextIcon from "./playNextOp.svg";
import playPreviousIcon from "./playPreviousOp.svg";
import playIcon from "./playOp.svg";
import pauseIcon from "./pauseOp.svg";
import speakerIcon from "./speakerOp.svg"


const AudioPlayer = props =>{
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [timeUpdate, setTimeUpdate] = useState(0);
    const [title, setTitle] = useState(undefined);
    const audio = useRef();
    
    const playNextPrevious = delta =>{
        if (props.index){
            const newIndex = props.index + delta;
            if (newIndex >= 0  || newIndex < props.dataPoints.length){
                props.setIndex(newIndex);
            }
        }
    };
    
    const changePlayTime = (event) => {
        audio.current.currentTime = event.target.value;
        setTimeUpdate(event.target.value);
    };
    
    const onTimeUpdate = () => {
        setTimeUpdate(Math.floor(audio.current.currentTime));
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
        if (props.index){
            const audioLink = new URL(props.dataPoints[props.index].mp3Link, "https://quietavenue.com");
            audio.current.setAttribute('src', audioLink);
            audio.current.autoplay = true;
            setTitle(new Date(props.dataPoints[props.index].time));
        }
    }, [props.index]);
    
    return(
        <Fragment>
            { title && 
                <h3>
                    {title.toLocaleDateString("en-US")} <span> </span>
                    {title.toLocaleTimeString("en-US")}
                </h3>
            }
            <p>{convertTime(timeUpdate)}</p>
            <p>{convertTime(duration)}</p>
            <input type="range" min="0" max={duration} step="1" value={timeUpdate}
            onChange={ event => changePlayTime(event)}/>
            <div className="flex">
                <button onClick={() => playNextPrevious(-1)}>
                    <img className="mr-6" src={playPreviousIcon} alt="Play Previous"/>
                </button>
                <button onClick={play}>
                    {isPlaying
                        ?<img className="mr-6" src={playIcon} alt="Play"/>
                        :<img className="mr-6" src={pauseIcon} alt="Play"/>
                    }
                </button>
                <button onClick={() => playNextPrevious(1)}>
                    <img src={playNextIcon} alt="Play Next"/>
                </button>
            </div>
            <img src={speakerIcon} alt="speaker"/>
            <input type="range" min="0" max="1" step="0.1" onChange={ event => volumeChange(event)}/>
            <audio ref={audio} onPlay={onPlay} onPause={onPause} onLoadedMetadata={getDuration} onTimeUpdate={onTimeUpdate}>
                <source  type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </Fragment>
    );
};

export default AudioPlayer;