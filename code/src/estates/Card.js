import React from "react";
import { Link } from "react-router-dom";


const Card = props =>{
  const link = "/estate/" + props.estate.id;
  return (
    <div className="shadow-md border-b-2 border-green-600 rounded-md">
      <Link to={link}>
        <img 
        data-cy="profilePicture"
        className="w-full h-64 object-cover rounded-md" 
        src={props.estate.profilePicture} 
        alt="Estate" />
        <div key={props.estate.id} className="m-2 ml-6">
          <h2 
          data-cy="street"
          className="text-lg text-stone-800 font-semibold">
            {props.estate.address1}
          </h2>
          <h3 data-cy="city" className="text-stone-500">
            {props.estate.address2}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;