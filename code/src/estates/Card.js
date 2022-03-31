import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Card = props =>{
  const link = "/estate/" + props.estate.id;
  return (
    <div className="shadow-md border-b-2 border-green-600 rounded-md">
      <Link to={link}>
        <img 
        className="w-full h-64 object-cover rounded-md" 
        src={props.estate.profilePicture} 
        alt="Estate" />
        <div key={props.estate.id} className="m-2 ml-6">
          <h2 className="text-lg text-stone-800 font-semibold">
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