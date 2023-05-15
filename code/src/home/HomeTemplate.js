import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import deleteFilter from "./deleteFilter.svg";
import audioAndVideo from "./audioAndVideo.jpg";
import noisyNeighbor from "./noisyNeighbor.jpg";

const HomeTemaplate = (props) =>{
  let filter = undefined;
  if (props.filter === "cityId") filter = "Filter: " + props.estates[0].city;
  if (props.filter === "zipCode") filter = "Filter: " + props.estates[0].zipCode;
  
  const cardsList = props.estates.map( estate =>{
    return <Card estate={estate} key={estate.id}/>;
  });
  
  return (
    <Fragment>
      { !filter &&
        <Fragment>
          <div className="px-3 flex justify-center py-16 mb-12 bg-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-lg">
              <div className="flex flex-col bg-white rounded-md px-2 py-2">
                <h3 className="text-lg sm:text-xl mb-2 text-stone-800 font-medium"> 
                  Buying a house is stressfull!
                </h3>
                <img src={noisyNeighbor} className="mb-2 aspect-auto border border-strone-200 w-full "/>
                <p className=" text-base text-stone-800">
                  When you buy a house, you make a long-term commitment to the area where you buy, but...
                  What if the neighbors are loud?  Are there parties every weekend? Barking dogs at 4am?...
                </p>
              </div>
              <div className="flex flex-col bg-white rounded-md px-2 py-2">
                <h3 className="text-lg sm:text-xl mb-2 text-stone-800 font-medium"> 
                  QuietAvenue can help you!
                </h3>
                <img src={audioAndVideo} className="mb-2 aspect-auto border border-strone-200 w-full "/>
                <p className="mb-6 text-justify text-base text-stone-800">
                  In QuietAvenue.com we use audio and video recorded on site that is analyzed with proprietary AI so you can see and hear out what it is like to live in that area.
                </p>
                <Link to="/workFlow" className="" data-cy="callToAction">
                  <div className="flex justify-center">
                    <h2 className="drop-shadow-lg bg-green-600 rounded-md p-3 mb-3 text-2xl text-white text-center">
                      Real state professional? <br /> <span className="underline" >click here</span>
                    </h2>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      }
      <h2 className="text-xl sm:text-2xl text-center px-3 mb-10 text-stone-800">
          Current properties <span className="text-green-600"> on sale</span> 
      </h2>
      { filter &&
        <div className="inline-block m-2 ml-6 mb-10" data-cy="filter">
          <div className="flex flex-row justify-center items-center p-2 
          rounded-full border border-stone-400 bg-green-600 font-medium">
            <h2 className="text-lg text-white pr-2.5" data-cy="filterName">{filter}</h2>
            <Link to="/" data-cy="deleteFilter">
              <img className="w-6" src={deleteFilter} alt="delete filter"/>
            </Link>
          </div>
        </div>
      }
      <div
      className="mb-8 mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {cardsList}
      </div>
    </Fragment>
  );
};

export default HomeTemaplate;