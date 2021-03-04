import React from "react";
import { Link } from "react-router-dom";

const Card = props =>{
  return (
    <Link to={"/property/" + props.property.PK} className="Card">
      <img className="Card__image" src={props.property.profilePicture} alt="Property" />
      <span className="Card__text">
        <h2>
          {props.property.address1}
        </h2>
        <h3>
          {props.property.address2}
        </h3>
      </span>
    </Link>
  );
};

export default Card;