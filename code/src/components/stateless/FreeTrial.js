import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import logo from "../../images/quietavenueLogoWhite.svg";
import BackArrow from "./BackArrow";
import HamburgerMenu from "../HamburgerMenu";
import headerImage from  "../../images/headerImage.jpg";

const FreeTrial = (props) =>{
  return(
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
        <div className="flex justify-between w-full p-2.5 mb-8">
          <BackArrow color="#ffffff"/>
          <HamburgerMenu color="#ffffff"/>
        </div>
        <Link className="flex flex-row items-center mb-8" to="/">
          <img src={logo} alt="logo" className="h-12"/>
          <h1 className="text-4xl text-white pl-1">QuietAvenue</h1>
        </Link>
        <h2 className="p-2.5 max-w-screen-md text-center text-white mb-16 text-lg"
        style={{textShadow: "2px 2px 4px #000000"}}>
          Prospective buyers are more likely to do a house tour if a listing has more information available online
        </h2>
      </header>
      <div className="flex flex-col items-center p-2.5">
        <h4 className="mb-4 max-w-screen-md ">
          When you enroll your property for a free trial,* you provide prospective customers with the information they need to make an informed purchase.
        </h4>
        <h4 className="mb-6 max-w-screen-md">
          One of our recording technicians will go to your property and set up discrete recording equipment. A week later the analysis of your property’s data will be available in our website. Prospective buyers can find your property’s information through a google search, or you can provide a direct link in your marketing materials or MLS/Zillow/Redfin listing Call now to set up your listing’s recording.
        </h4>
        <h1 className="mb-6 text-center text-2xl font-bold text-green-600">
          Call or Text to Enroll Free! +650-391-6820
        </h1>
        <h4 className="mb-10 max-w-screen-md">
          * Free trial limited to one property per agent.
        </h4>
      </div>
    </Fragment>
  ) ; 
};

export default FreeTrial;