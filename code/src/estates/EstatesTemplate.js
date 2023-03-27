import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import deleteFilter from "./deleteFilter.svg";

const EstatesTemaplate = (props) =>{
  let filter = undefined;
  if (props.filter === "cityId") filter = "Filter: " + props.estates[0].city;
  if (props.filter === "zipCode") filter = "Filter: " + props.estates[0].zipCode;
  
  const cardsList = props.estates.map( estate =>{
    return <Card estate={estate} key={estate.id}/>;
  });
  
  return (
    <Fragment>
      { filter &&
        <div className="inline-block m-2 ml-6 mb-4" data-cy="filter">
          <div className="flex flex-row justify-center items-center p-2 rounded-full border border-stone-400 bg-green-600">
            <h2 className="text-lg text-white pr-2.5" data-cy="filterName">{filter}</h2>
            <Link to="/" data-cy="deleteFilter">
              <img className="w-6" src={deleteFilter} alt="delete filter"/>
            </Link>
          </div>
        </div>
      }
      { !filter && 
        <div className="flex justify-center m-2 mb-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl text-stone-800 font-semibold pb-4 ">Are you an agent?</h2>
            <Link to="/trial" className="flex flex-col items-center p-4 bg-green-500 border border-stone-400 rounded-md shadow-xl">
              <h3 className="text-lg text-white text-center">learn about our <span className="font-semibold">free trial >></span></h3>
            </Link>
          </div>
        </div>
      }
      <div 
      className="mb-8 m-2.5 grid grid-cols-1 md:m-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardsList}
      </div>
    </Fragment>
  );
};

export default EstatesTemaplate;