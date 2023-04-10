import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from "../common/Header";
import Vimeo from "./Vimeo";

const EstateTemplate = (props) => {
  return (
    <Fragment>
      <Header /> 
      <div className="flex justify-center mb-8">
        <img 
        data-cy="profilePicture"
        src={props.estate.profilePicture} 
        alt="Property" 
        className="aspect-auto rounded-md border border-strone-200 max-w-screen-sm w-full h-auto" />
      </div>
      <div className="flex justify-start">
        <h2 
        data-cy="address"
        className="text-2xl text-stone-800">
          {props.estate.address1+ " " + props.estate.address2}
        </h2>
      </div>
        
      {props.price &&
        <h2 className="text-lg text-center text-stone-800 mb-4" data-cy="estatePrice">
          {props.price}
        </h2>
      }
      
      <ul className="flex items-center space-x-5 mb-10">
        {props.estate.bathroom &&
          <Fragment>
            <li className="text-stone-800 " data-cy="estateBathroom">
              {props.estate.bathroom} bath
            </li>
            <li><span className="block bg-green-600 w-0.5 h-5"></span></li>
          </Fragment>
        }
        {props.estate.bedroom &&
          <Fragment>
            <li className="text-stone-800" data-cy="estateBedroom">
              {props.estate.bedroom} bed
            </li>
            <li><span className="block bg-green-600 w-0.5 h-5"></span></li>
          </Fragment>
        }
        {props.estate.lotArea &&
          <li className="text-stone-800" data-cy="estateLotArea">
            {props.estate.lotArea} sq.ft. lot
          </li>
        }
      </ul>
    
      
      {props.estate.videoLink &&
        <Vimeo iframeSRC={props.estate.videoLink} />
      }
        
      <div className="flex flex-col items-center px-2 ">
        {props.estate.soundScore &&
          <div className="flex flex-col mb-4" data-cy="estateSoundScore">
            <h2 className="text-2xl mb-1 text-stone-800 font-semibold">Noise Score</h2>
            <div className="flex justify-center">
              <h2 className="text-4xl text-stone-800 leading-9 bg-green-500 
              rounded-full border border-stone-400"
              style={{padding: "0.5rem 0.5rem 0.7rem 0.5rem"}}>
                {props.estate.soundScore}
              </h2>
            </div>
          </div>
        }
        
        {props.estate.audioDescription &&
          <div className=" space-x-4 " data-cy="estateAudioDescription">
            <h3 className=" text-xl text-stone-800 max-w-xl text-center 
            mb-14 ">
              {props.estate.audioDescription}
            </h3>
          </div>
        }
        {props.graphs.length > 0 &&
          <div 
          className="w-full lg:w-9/12 xl:w-6/12" 
          data-cy="estateAudioGraph">
            {props.graphs}
          </div>
        }
      </div>
    </Fragment>
  );
};

export default EstateTemplate;
