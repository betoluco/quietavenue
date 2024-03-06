import React, {Fragment} from "react";

import Vimeo from "./Vimeo";

const EstateTemplate = (props) => {
  return (
    <div className="px-3 flex flex-col items-center">
      <div className="w-full lg:w-9/12 xl:w-6/12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <img 
          src={props.estate.profilePicture} 
          alt="Property" 
          className="aspect-auto border border-strone-400 max-w-screen-sm w-full h-auto rounded-md" />
        
          <div className="flex flex-col">
            <h2 
            className="text-2xl text-stone-800 mb-2">
              {props.estate.address1+ " " + props.estate.address2}
            </h2>
            
            {props.price &&
              <h2 className="text-lg text-stone-800 mb-2">
                {props.price}
              </h2>
            }
            
            <ul className="flex items-center space-x-5 mb-10">
              {props.estate.bathroom &&
                <Fragment>
                  <li className="text-stone-800 ">
                    {props.estate.bathroom} bath
                  </li>
                  <li><span className="block bg-green-600 w-0.5 h-5"></span></li>
                </Fragment>
              }
              {props.estate.bedroom &&
                <Fragment>
                  <li className="text-stone-800">
                     {props.estate.bedroom} bed
                  </li>
                  <li><span className="block bg-green-600 w-0.5 h-5"></span></li>
                </Fragment>
              }
              {props.estate.lotArea &&
                <li className="text-stone-800">
                  {props.estate.lotArea} sq.ft. lot
                </li>
              }
            </ul>
          </div>
        </div>
        
        {props.estate.videoLink &&
          <div>
            <h2 className="mb-4 text-stone-800 text-center max-w-screen-md font-medium text-lg sm:text-xl">
              Video recorded in front of the property  
            </h2>
            <Vimeo iframeSRC={props.estate.videoLink} />
          </div>
        }
        
        {props.estate.soundScore &&
          <div className="w-full mb-6 flex items-center">
            <h2 className="text-2xl text-white font-semibold bg-green-600 rounded-full mr-4"
            style={{padding: "0.5rem 0.5rem 0.7rem 0.5rem"}}>
              {props.estate.soundScore}<span className="text-sm font-normal">/10</span>
            </h2>
            <p className="text-2xl text-stone-800 font-semibold">Noise Score</p>
          </div>
        }
        
        {props.estate.audioDescription &&
          <div className=" space-x-4 ">
            <h3 className="text-lg text-stone-800 w-full mb-12">
              {props.estate.audioDescription}
            </h3>
          </div>
        }
        {props.graph &&
          <Fragment>
            {props.graph}
          </Fragment>
        }
      </div>
    </div>
  );
};

export default EstateTemplate;
