import React from "react";

const Vimeo = props => {
  return(
    <div className="Video">
      <iframe 
        src={props.iframeSRC} 
        className="Video__vimeo"
        frameBorder="0" 
        allow="autoplay; fullscreen" 
        allowFullScreen>
      </iframe>
    </div>
  );
};

export default Vimeo;