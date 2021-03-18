import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search";

const PropertyHeader = ({ route }) =>{
  return(
      <header className="">
        <Link className="" to="/">
          <h1 className="">QuietAvenue.com</h1>
        </Link>
        <Search />
      </header>
  );
}; 


export default PropertyHeader;