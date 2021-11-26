import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Card = props =>{
  const estate = useSelector( state => state[props.estate]);
  const link = "/estate/" + estate.id;
  return (
    <div className="m-2.5 shadow-md border-b-2 border-green-600" key={estate.id}>
      <Link to={link}>
        <img 
        className="w-full h-64 object-cover" 
        src={estate.profilePicture} 
        alt="Estate" />
        <div className="m-2">
          <h2 className="text-lg">
            {estate.address1}
          </h2>
          <h3 className="text-sm">
            {estate.address2}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;