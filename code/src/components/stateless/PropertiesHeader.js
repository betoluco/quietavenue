import React, { Fragment } from "react";
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";


import Search from "../Search";

const PropertiesHeader = ({ route }) =>{
  
  return(
    <Fragment>
      <header className="PropertiesHeader">
        <div className="PropertiesHeader__flexbox">
          <Link className="PropertiesHeader__link" to="/">
            <img 
              src="https://s3-us-west-1.amazonaws.com/quietavenue.com/images/quietavenue_logo_bold_white.svg"
              alt="logo"
              className="PropertiesHeader__logo"/>
           
              QuietAvenue
            
          </Link>
   
        </div>
          See and hear what goes on in front <br /> of your future hom
        <Search />
      </header>
      { renderRoutes(route.routes) }
    </Fragment>
  );
}; 


export default PropertiesHeader;