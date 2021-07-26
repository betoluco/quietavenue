import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const Card = props =>{
  const estate = useSelector( state => state[props.estate]);
  const link = "estate/" + estate.id;
  
  return (
    <div key={estate.id} className="Card">
      <Link to={link}>
        <img className="Card__image" src={estate.profilePicture} alt="Estate" />
        <span className="Card__text">
          <h2>
            {estate.address1}
          </h2>
          <h3>
            {estate.address2}
          </h3>
        </span>
      </Link>
    </div>
  );
};

export default Card;