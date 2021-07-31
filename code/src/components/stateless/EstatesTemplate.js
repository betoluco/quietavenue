import React, {Fragment} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "./Card";
import cancelButton from "../../images/cancelButton.svg"

const EstatesTemaplate = (props) =>{
  const estate = useSelector( state => state.[props.estates[0]]);
  
  let filter = undefined;
  if (props.filter === "cityId") filter = "Filter: " + estate.city
  if (props.filter === "zipCode") filter = "Filter: " + estate.zipCode;
  
  const cardsList = props.estates.map( estate =>{
    return <Card estate={estate}/>;
  });
  
  return (
    <Fragment>
      { filter &&
        <div className="inline-block m-2">
          <div className="flex flex-row justify-center p-1 rounded-full border-2 border-green-800 bg-green-600">
            <h2 className="text-white pr-1">{filter}</h2>
            <Link to="/">
              <img className="transform hover:scale-125 h-6" src={cancelButton} alt="Cancel filter"/>
            </Link>
          </div>
        </div>
      }
      { !filter && <div className="h-6"></div> }
      <div 
      className="m-2 mt-4 mb-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cardsList}
      </div>
    </Fragment>
  );
};

export default EstatesTemaplate;