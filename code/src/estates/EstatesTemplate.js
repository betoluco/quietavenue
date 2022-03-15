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
        <div className="inline-block m-2 mb-4">
          <div className="flex flex-row justify-center items-center p-2 rounded-full border border-green-800 bg-green-600">
            <h2 className="text-lg  text-white pr-2.5">{filter}</h2>
            <Link to="/">
              <img className="" src={deleteFilter} alt="delete filter"/>
            </Link>
          </div>
        </div>
      }
      { !filter && 
        <div className="flex justify-center m-2 mb-8">
        <Link to="/trial" className="flex flex-col items-center p-4 bg-green-600 border border-green-800 rounded-md shadow-xl">
          <h2 className="text-2xl text-white font-semibold pb-2 ">Are you an agent?</h2>
          <h3 className="text-lg text-white text-center">Click here to learn more about our <span className="font-semibold underline">free trial.</span></h3>
        </Link>
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