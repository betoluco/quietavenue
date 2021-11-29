import React, { useRef, useEffect} from "react";

const AudioPlayer = (props) =>{
    
    const audio = useRef();
    const source = useRef();
    
    useEffect(() =>{
        source.current.src = new URL(props.audioFile, "https://quietavenue.com");
        audio.current.load();
        audio.current.autoplay = true;
    }, [props.audioFile]);
    
    return(
        <audio className="w-64 h-10 mb-20" ref={audio} controls>
            <source ref={source}  type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioPlayer;