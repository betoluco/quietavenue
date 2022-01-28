import React, { Fragment, useRef, useEffect} from "react";

const AudioPlayer = (props) =>{
    
    const audio = useRef();
    const source = useRef();
    
    useEffect(() =>{
        source.current.src = new URL(props.audioFileLink, "https://quietavenue.com");
        audio.current.load();
        audio.current.autoplay = true;
    }, [props.audioFileLink]);
    
    return(
        <Fragment>
            {props.recordingTime && 
                <h3>
                    {props.recordingTime.toLocaleDateString("en-US")} {' '}
                    {props.recordingTime.toLocaleTimeString("en-US")}
                </h3>
            }
            <audio className="w-64 h-10 mb-20" ref={audio} controls>
                <source ref={source}  type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </Fragment>
    );
};

export default AudioPlayer;