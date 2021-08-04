import React from "react";
import { Link } from "react-router-dom";

import logo from "../../images/quietavenueLogoGreen.svg";
import BackArrow from "./BackArrow";
import Search from "../Search";
import Vimeo from "./Vimeo";
import Graph from "../Graph";

const EstateTemplate = (props) => {
  return (
    <React.Fragment>
      <header className="m-2">
        <div className="flex flex-row justify-between mb-7">
          <BackArrow />
          <Link className="flex flex-row items-center" to="/">
            <img src={logo} alt="logo" className="h-8"/>
            <h1 className="text-2xl text-green-600 pl-1">QuietAvenue</h1>
          </Link>
          <div className="w-6"></div>
        </div>
        <Search />
      </header>
      <div className="bg-gray-100 p-2 pt-7 mb-8" >
        <div className="flex flex-row flex-wrap items-center justify-center mb-4">
          <img 
          src={props.estate.profilePicture} 
          alt="Property" 
          className="h-28 w-28 mb-4 rounded-full object-cover" />
          <h2 className="ml-4 text-center text-2xl">
            {props.estate.address1+ " " + props.estate.address2}
          </h2>
        </div>
        {props.estate.videoLink &&
          <Vimeo iframeSRC={props.estate.videoLink} />
        }
        {props.estate.graphData &&
          <Graph dataPoints={props.estate.graphData} />
        }
      </div>
    </React.Fragment>
  );
};

export default EstateTemplate;