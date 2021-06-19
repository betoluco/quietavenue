import React, { useRef, useEffect} from "react";

import domainName from "../../API/domainName";

const AudioPlayer = (props) =>{
    
    const audio = useRef();
    const source = useRef();
    
    useEffect(() =>{
        source.current.src = new URL(props.audioFile, domainName);
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