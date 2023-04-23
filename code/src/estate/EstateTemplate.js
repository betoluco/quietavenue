import React, { Fragment } from "react";

import Header from "../common/Header";
import Vimeo from "./Vimeo";

const EstateTemplate = (props) => {
  return (
    <Fragment>
      <Header />
      <div className="px-3 flex flex-col items-center">
        <div className="w-full lg:w-9/12 xl:w-6/12 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <img 
            data-cy="profilePicture"
            src={props.estate.profilePicture} 
            alt="Property" 
            className="aspect-auto border border-strone-400 max-w-screen-sm w-full h-auto" />
          
            <div className="flex flex-col">
              <h2 
              data-cy="address"
              className="text-2xl text-stone-800 mb-2">
                {props.estate.address1+ " " + props.estate.address2}
              </h2>
              
              {props.price &&
                <h2 className="text-lg text-stone-800 mb-2" data-cy="estatePrice">
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
            </div>
          </div>
          
          {props.estate.videoLink &&
            <Vimeo iframeSRC={props.estate.videoLink} />
          }
          
          {props.estate.soundScore &&
            <div className="w-full mb-6 flex items-center" data-cy="estateSoundScore">
              <h2 className="text-2xl text-white font-semibold bg-green-600 rounded-full mr-4"
              style={{padding: "0.5rem 0.5rem 0.7rem 0.5rem"}}>
                {props.estate.soundScore}<span className="text-sm font-normal">/10</span>
              </h2>
              <p className="text-2xl text-stone-800 font-semibold">Noise Score</p>
            </div>
          }
          
          {props.estate.audioDescription &&
            <div className=" space-x-4 " data-cy="estateAudioDescription">
              <h3 className=" text-xl text-stone-800 max-w-xl mb-10">
                {props.estate.audioDescription}
              </h3>
            </div>
          }
          {props.graphs.length > 0 &&
            <div 
            className="" 
            data-cy="estateAudioGraph">
              <h2 className="text-stone-800 text-center max-w-screen-md text-3xl">
                Audio Graphs
              </h2>
              {props.graphs}
            </div>
          }
        </div>
      </div>
    </Fragment>
  );
};

export default EstateTemplate;
