import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "./Card";
import cancelButton from "../../images/cancelButton.svg"
import Search from "../Search";
import logo from "../../images/quietavenueLogoWhite.svg";
import headerImage from  "../../images/headerImage.jpg";
import HamburgerMenu from "../HamburgerMenu";

const EstatesTemaplate = (props) =>{
  const estate = useSelector( state => state.[props.estates[0]]);
  
  let filter = undefined;
  if (props.filter === "cityId") filter = "Filter: " + estate.city
  if (props.filter === "zipCode") filter = "Filter: " + estate.zipCode;
  
  const cardsList = props.estates.map( estate =>{
    return <Card estate={estate}/>;
  });
  
  return (
    <Fragment>
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
      
      { filter &&
        <div className="inline-block m-2">
          <div className="flex flex-row justify-center p-1 rounded-full border-2 border-green-800 bg-green-600">
            <h2 className="text-white pr-1">{filter}</h2>
            <Link to="/">
              <img className="transform hover:scale-125 h-6" src={cancelButton} alt="Cancel filter"/>
            </Link>
          </div>
        </div>
      }
      { !filter && 
        <div className="flex justify-center">
        <Link to="/trial" >
          <h2 className="inline-block m-4 mb-4 p-2 text-center text-white font-medium bg-green-600 border-2 border-green-800 rounded-md shadow-xl">
            Are you an agent? <br /> Click here to learn more about our free trial.
          </h2>
        </Link>
        </div>
      }
      <div 
      className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardsList}
      </div>
    </Fragment>
  );
};

export default EstatesTemaplate;