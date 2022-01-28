import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "./Card";
import cancelButton from "./cancelButton.svg";

const EstatesTemaplate = (props) =>{
  // const estate = useSelector( state => state.[props.estates[0]]);
  
  // let filter = undefined;
  // if (props.filter === "cityId") filter = "Filter: " + estate.city
  // if (props.filter === "zipCode") filter = "Filter: " + estate.zipCode;
  
  const cardsList = props.estates.map( estate =>{
    return <Card estate={estate} key={estate}/>;
  });
  
  return (
    <Fragment>
      {/*{ filter &&
        <div className="inline-block m-2">
          <div className="flex flex-row justify-center p-1 rounded-full border-2 border-green-800 bg-green-600">
            <h2 className="text-white pr-1">{filter}</h2>
            <Link to="/">
              <img className="transform hover:scale-125 h-6" src={cancelButton} alt="Cancel filter"/>
            </Link>
          </div>
        </div>
      }
      { !filter && 
        <div className="flex justify-center">
        <Link to="/trial" >
          <h2 className="inline-block m-4 mb-4 p-2 text-center text-white font-medium bg-green-600 border-2 border-green-800 rounded-md shadow-xl">
            Are you an agent? <br /> Click here to learn more about our free trial.
          </h2>
        </Link>
        </div>
      }*/}
      <div 
      className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardsList}
      </div>
    </Fragment>
  );
};

export default EstatesTemaplate;