import React from "react";
import { Link } from "react-router-dom";


const Card = props =>{
  return (
    <div className="shadow-lg border-b-2 border-green-600 rounded-md">
      <Link to={props.estate.url}>
        <img
        className="w-full border-b border-stone-300 h-64 object-cover rounded-t-md" 
        src={props.estate.profilePicture} 
        alt="Estate" />
        <div key={props.estate.estateId} className="m-2 ml-6">
          <h2
          className="text-xl text-stone-800 font-semibold">
            {props.estate.address1}
          </h2>
          <h3 className="text-stone-500">
            {props.estate.address2}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;