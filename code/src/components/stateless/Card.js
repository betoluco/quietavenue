import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Card = props =>{
  const estate = useSelector( state => state[props.estate]);
  const link = "/estate/" + estate.id;
  
  return (
    <div key={estate.id} className="shadow-md border-b-2 border-green-600">
      <Link to={link}>
        <img 
        className="w-full h-4/5 object-cover" 
        src={estate.profilePicture} 
        alt="Estate" />
        <span className="Card__text">
          <h2 className="text-lg">
            {estate.address1}
          </h2>
          <h3 className="text-sm">
            {estate.address2}
          </h3>
        </span>
      </Link>
    </div>
  );
};

export default Card;