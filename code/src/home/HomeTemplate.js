import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import deleteFilter from "./deleteFilter.svg";
import frustrated from "./frustrated.jpg";
import happy from "./happy.jpg";

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
          <Link to="/workFlow" className="" data-cy="HireUSLink">
            <div className="flex justify-center mb-12">
              <h2 className="drop-shadow-lg bg-green-600 rounded-md py-3 px-8 text-3xl font-bold text-white">
                Hire US!
              </h2>
            </div>
          </Link>
          <div className="px-3 flex justify-center py-16 mb-12 bg-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg">
              <div className="flex flex-col bg-white rounded-md px-2 py-2">
                <h3 className="text-xl sm:text-2xl mb-2 text-stone-800 font-semibold"> 
                  Buying a house is stressfull!
                </h3>
                <img src={frustrated} className="mb-2 aspect-auto border border-strone-200 w-full "/>
                <p className="text-justify text-base text-stone-800">A mortgage can easily be a 30-year commitment. While you won’t need to live in your home for the length of your mortgage term, you’ll still need to make a long-term commitment to the area where you buy.</p>
              </div>
              <div className="flex flex-col bg-white rounded-md px-2 pt-2 pb-4">
                <h3 className="text-xl sm:text-2xl mb-2 text-stone-800 font-semibold"> 
                  We can help you!
                </h3>
                <img src={happy} className="mb-2 aspect-auto border border-strone-200 w-full "/>
                <p className=" mb-4 text-justify text-base text-stone-800">In QuietAvenue.com we use audio and video recorded on site that is analyzed with our AI, so you can find out what it will be like to live in that area</p>
                <Link to="/mission" className="" data-cy="HowItWorksLink">
                  <div className="flex justify-center">
                    <h2 className="drop-shadow-lg bg-green-600 rounded-md p-3 text-2xl text-white">
                      How it works?
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