import React from "react";

const Vimeo = props => {
  return(
    <div className="flex flex-row justify-center mb-10">
      <div className= "relative w-full p-56.2 lg:w-9/12 lg:p-42.1 xl:w-6/12  xl:p-28.1">
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