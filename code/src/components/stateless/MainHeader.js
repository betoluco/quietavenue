import React, { Fragment } from "react";
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";

import Search from "../Search";
import logo from "../../images/quietavenueLogoWhite.svg";
import headerImage from  "../../images/headerImage.jpg";
import HamburgerMenu from "../HamburgerMenu";

const MainHeader = ({ route }) =>{
  return(
    <Fragment>
      <header 
      className="mb-6" 
      style={{
        backgroundImage: `url(${headerImage})`,
        backgroundSize: "cover",
        backgroundPosition:"50% 50%",
        backgroundRepeat:"no-repeat",
      }}>
        <div className="flex flex-row justify-between p-2 mb-16">
          <Link className="flex flex-row items-center " to="/">
            <img src={logo} alt="logo" className="h-10"/>
            <h1 className="text-3xl text-white pl-2">QuietAvenue</h1>
          </Link>
          <HamburgerMenu icon="#ffffff"/>
        </div>
        
        <h2 
        className="flex flex-row justify-center text-center text-white mb-16 text-lg"
        style={{textShadow: "2px 2px 4px #000000"}}>
          See and hear what goes on in front <br /> of your future home
        </h2>
        <Search />
      </header>
      { renderRoutes(route.routes) }
    </Fragment>
  );
}; 


export default MainHeader;