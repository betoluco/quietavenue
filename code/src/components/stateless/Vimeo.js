import React from "react";

const Vimeo = props => {
  return(
    <div>
      <div className="md:w-3/4" style={{padding:"56.25% 0 0 0", position:"relative"}}>
        <iframe 
          src={props.iframeSRC} 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen 
          style={{position:"absolute", top:"0", left:"0", width: "100%", height:"100%"}}
          title="House video">
        </iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
  );
};

export default Vimeo;