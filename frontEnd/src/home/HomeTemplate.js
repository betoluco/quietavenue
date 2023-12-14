import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import deleteFilter from "./deleteFilter.svg";
import audioAndVideoMD from "./audioAndVideoMD.png";
import audioAndVideoSM from "./audioAndVideoSM.png";
import noisyNeighborMD from "./noisyNeighborMD.jpg";
import noisyNeighborSM from "./noisyNeighborSM.jpg";

const HomeTemaplate = (props) =>{
  let filter = undefined;
  if (props.filter === "cityId") filter = "Filter: " + props.estates[0].city;
  if (props.filter === "zipCode") filter = "Filter: " + props.estates[0].zipCode;
  
  const cardsList = props.estates.map( estate =>{
    return <Card estate={estate} key={estate.url}/>;
  });
  
  return (
    <Fragment>
      { !filter &&
        <Fragment>
          <Link to="/workFlow" className="" data-cy="callToAction">
            <div className="flex justify-center my-8">
              <h2 className="drop-shadow-lg bg-green-600 rounded-md p-3 mb-3 text-2xl text-white text-center">
                Real estate professional? <br /> <span className="underline" >click here</span>
              </h2>
            </div>
          </Link>
          <div className="px-3 flex justify-center py-16 mb-12 bg-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-lg">
              <div className="flex flex-col bg-white rounded-md px-2 py-2">
                <h3 className="text-lg sm:text-xl mb-2 text-stone-800 font-medium"> 
                  Buying a house is stressfull!
                </h3>
                <img 
                className="mb-2 aspect-auto border border-strone-200 w-full "
                alt="noisy neighboor"
                srcSet={`
                    ${noisyNeighborMD} 1000w,
                    ${noisyNeighborSM} 500w
                `}
                size="(min-width: 768px) 50vw,(min-width: px1024) 512px, 100vw"
                src={noisyNeighborSM} />
                <p className=" text-base text-stone-800">
                  When you buy a house, you make a long-term commitment to the area where you buy, but...
                  What if the neighbors are loud?  Are there parties every weekend? Barking dogs at 4am?...
                </p>
              </div>
              <div className="flex flex-col bg-white rounded-md px-2 py-2">
                <h3 className="text-lg sm:text-xl mb-2 text-stone-800 font-medium"> 
                  QuietAvenue can help you!
                </h3>
                <img 
                className="mb-2 aspect-auto border border-strone-200 w-full "
                alt="audio and video"
                srcSet={`
                    ${audioAndVideoMD} 1000w,
                    ${audioAndVideoSM} 500w
                `}
                size="(min-width: 768px) 50vw,(min-width: px1024) 512px, 100vw"
                src={audioAndVideoSM} />
                <p className="mb-2 text-justify text-base text-stone-800">
                  In QuietAvenue.com we use audio and video recorded on site that is analyzed with proprietary AI so 
                  you can see and hear out what it is like to live in that area.
                </p>
                <Link to="/mission" className="text-center underline text-blue-600 hover:text-blue-800 mb-3">
                  lear more
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      }
      <h2 className="text-2xl sm:text-4xl text-center px-3 mb-10 text-stone-800">
          Current properties <span className="text-green-600"> on sale</span> 
      </h2>
      { filter &&
        <div className="inline-block m-2 ml-6 mb-10" data-cy="filter">
          <div className="flex flex-row justify-center items-center p-2 
          rounded-full border border-stone-400 bg-green-600 font-medium">
            <h2 className="text-lg text-white pr-2.5" data-cy="filterName">{filter}</h2>
            <Link to="/">
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