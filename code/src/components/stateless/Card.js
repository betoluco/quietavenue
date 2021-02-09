import React from "react";
import { Link } from "react-router-dom";

const Card = props =>{
  return (
    <Link to={"/property/" + props.property.id} className="Card">
      <img className="Card__image" src={props.property.profile_picture} alt="Property" />
      <span className="Card__text">
        <h2>
          {props.property.number + " " + props.property.street}
        </h2>
        <h3>
          {props.property.city + ", " + props.property.zip_code + ", " + props.property.state}
        </h3>
      </span>
    </Link>
  );
};

export default Card;