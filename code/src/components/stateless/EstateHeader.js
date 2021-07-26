import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search";

const EstateHeader = ({ route }) =>{
  return(
      <header className="">
        <Link className="" to="/">
          <h1 className="">QuietAvenue.com</h1>
        </Link>
        <Search />
      </header>
  );
}; 


export default EstateHeader;