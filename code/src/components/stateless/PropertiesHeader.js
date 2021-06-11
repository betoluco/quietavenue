import React, { Fragment } from "react";
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";

import Search from "../Search";
import logo from "../../images/quietavenueLogo.svg"
import headerImage from  "../../images/headerImage.jpeg"

const PropertiesHeader = ({ route }) =>{
  
  return(
    <Fragment>
      <header className="mb-6" style={{backgroundImage: `url(${headerImage})`}}>
        <Link className="flex flex-row items-center p-2 mb-16" to="/">
          <img src={logo} alt="logo" className="h-8"/>
          <h1 className="text-2xl text-white pl-2">QuietAvenue</h1>
        </Link>
          
        <h2 className="flex flex-row justify-center text-center text-white mb-16">
          See and hear what goes on in front <br /> of your future home
        </h2>
        <Search />
      </header>
      { renderRoutes(route.routes) }
    </Fragment>
  );
}; 


export default PropertiesHeader;