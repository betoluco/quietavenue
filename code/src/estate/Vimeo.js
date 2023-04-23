import React, {Fragment} from "react";

const Vimeo = props => {
  return(
    <Fragment>
      <div 
      data-cy="estateVideo"
      className="mb-12 w-full relative pb-[56.25%] ">
        <iframe 
          src={props.iframeSRC} 
          frameBorder="0"
          className="border border-stone-400 mb-8"
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen
          style={{position:"absolute", top:"0", left:"0", width: "100%", height:"100%"}}
          title="House video">
        </iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </Fragment>
  );
};

export default Vimeo;