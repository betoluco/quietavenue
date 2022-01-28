import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import HamburgerMenu from "./HamburgerMenu";
import Search from "./Search";
import logo from "./images/quietavenueLogoWhite.svg";
import headerImage from  "./headerImage.jpg";

const Header = (props) =>{
  return (
    <header 
    className="flex flex-col items-center mb-6" 
    style={{
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.60), rgba(130, 130, 130, 0.5)),
      url(${headerImage})`,
      backgroundSize: "cover",
      backgroundPosition:"50% 50%",
      backgroundRepeat:"no-repeat",
    }}>
      <div className="flex flex-row justify-between w-full p-2.5 mb-16">
        <Link className="flex flex-row items-center" to="/">
          <img src={logo} alt="logo" className="h-10"/>
          <h1 className="text-3xl text-white pl-2">QuietAvenue</h1>
        </Link>
        <HamburgerMenu color="#ffffff"/>
      </div>
      
      <h2 
      className="text-center text-white mb-16 text-lg"
      style={{textShadow: "2px 2px 4px #000000"}}>
        See and hear what goes on in front of your future home
      </h2>
      <Search />
    </header>
  );
};

export default Header;