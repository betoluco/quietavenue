import React, {useRef, useState, useEffect, Fragment} from "react";

import ProgressBar from "./ProgressBar";
import PlayButton from "./PlayButton";
import TrackIndicator from "./TrackIndicator";
import SkipButton from "./SkipButton";
import BackButton from "./BackButton";
import Graph from './Graph';


const AudioPlayer = props =>{
    const audio = useRef();
    const [trackDuration, setTrackDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    const daysList = Object.keys(props.audioData);
    const mp3LinksList = daysList.map( day => props.audioData[day].mp3Link);
    
    useEffect(()=>{
         audio.current.setAttribute('src', mp3LinksList[currentTrack]);
    }, [currentTrack]);
    
    const changeTrack = step =>{
        if(mp3LinksList[currentTrack + step] != undefined ){
            setCurrentTrack(currentTrack + step);
        }
    };
    
    const onTimeUpdate = () => {
        if(Math.floor(audio.current.currentTime) !== Math.floor(elapsedTime)){
            if(audio.current.readyState === HTMLMediaElement.HAVE_CURRENT_DATA) 
                setElapsedTime(Math.floor(audio.current.currentTime)); 
        }
    };
    
    return(
        <Fragment>
            <h2 className="text-stone-800 text-center max-w-screen-md text-lg sm:text-xl mb-3">
                Audio recorded in the property <br/>
                {new Date(daysList[0])
                .toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'})}
                <span> - </span>
                {new Date(daysList.at(-1))
                .toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'})}
            </h2>
            <div className="sticky top-0 pt-3 flex flex-col items-center w-full mb-4 bg-white z-10">
                <div className="w-full flex justify-center mb-3">
                    <BackButton changeTrack={changeTrack} />
                    <PlayButton 
                    audio={audio} 
                    isPlaying={isPlaying}
                    changeTrack={changeTrack}/>
                    <SkipButton changeTrack={changeTrack} />
                </div>
                <TrackIndicator daysList={daysList} currentTrack={currentTrack}/>
                <ProgressBar 
                duration={trackDuration} 
                elapsedTime={elapsedTime} 
                audio={audio}/>
                <audio data-testid="html-audio" ref={audio}
                onError={() => changeTrack(1)}
                onPlay={() => setIsPlaying(true)} 
                onPause={() => setIsPlaying(false)}
                onCanPlay={() => isPlaying&& audio.current.play()}
                onLoadedMetadata={
                    () => setTrackDuration(Math.floor(audio.current.duration))
                } 
                onTimeUpdate={onTimeUpdate}>
                    <source type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            </div>
                <Graph 
                daysList={daysList}
                audioData={props.audioData}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
                elapsedTime={elapsedTime}
                setElapsedTime={setElapsedTime}/>
        </Fragment>
    );
};

export default AudioPlayer; 