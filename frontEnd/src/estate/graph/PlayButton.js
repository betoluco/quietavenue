import React from "react";

import playIcon from "./playOp.svg";
import pauseIcon from "./pauseOp.svg";

const PlayButton = props =>{
    const play = () => {
        if(props.isPlaying){
            props.audio.current.pause();
        }else{
            try{
                props.audio.current.play();
            }catch (error){
                console.error(error);
                props.changeTrack(1);
            }
        } 
    };
    
    return(
        <button 
            className="w-12 mx-16"
            onClick={play}>
            {props.isPlaying
                ?<img src={pauseIcon} alt="Pause"/>
                :<img src={playIcon} alt="Play"/>
            }
        </button>
    );
};

export default PlayButton;