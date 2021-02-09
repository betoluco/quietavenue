import React from "react";
import { Link } from "react-router-dom";

const Suggestions = props =>{
    return (
        <li
        className=""
        key={props.key}
        onClick={ () => props.onClickHandler( props.text ) }>
            <Link to={props.to}>
                {props.text}
            </Link>
        </li>
    );
};
  
export default Suggestions;