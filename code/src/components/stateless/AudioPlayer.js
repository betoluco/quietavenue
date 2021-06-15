import React, { useRef, useEffect} from "react";

const AudioPlayer = (props) =>{
    
    const audio = useRef();
    const source = useRef();
    
    useEffect(() =>{
        source.current.src = props.audioFile;
        audio.current.load();
        audio.current.autoplay = true;
    }, [props.audioFile]);
    
    return(
        <audio ref={audio} controls>
            <source ref={source}  type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioPlayer;