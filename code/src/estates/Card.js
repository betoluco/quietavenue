import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Card = props =>{
  const link = "/estate/" + props.estate.id;
  return (
    <div className="m-2.5 shadow-md border-b-2 border-green-600">
      <Link to={link}>
        <img 
        className="w-full h-64 object-cover" 
        src={props.estate.profilePicture} 
        alt="Estate" />
        <div key={props.estate.id} className="m-2">
          <h2 className="text-lg">
            {props.estate.address1}
          </h2>
          <h3 className="text-sm">
            {props.estate.address2}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;