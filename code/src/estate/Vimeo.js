import React from "react";

const Vimeo = props => {
  return(
    <div className="mb-4 flex justify-center"  data-cy="estateVideo">
      <div className= "relative w-full p-56.2 lg:w-9/12 lg:p-42.1 xl:w-6/12  xl:p-28.1">
        <iframe 
          src={props.iframeSRC} 
          frameBorder="0"
          className="border border-stone-400 mb-8"
          allow="autoplay; fullscreen; picture-in-picture" 
          style={{position:"absolute", top:"0", left:"0", width: "100%", height:"100%"}}
          title="House video">
        </iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
  );
};

export default Vimeo;