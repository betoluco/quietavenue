import React from "react";
import { Link } from "react-router-dom";

import logo from "../../images/quietavenueLogoGreen.svg";
import BackArrow from "./BackArrow";
import Search from "../Search";
import Vimeo from "./Vimeo";
import Graph from "../Graph";
import HamburgerMenu from "../HamburgerMenu";

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
          <HamburgerMenu color="#000000"/>
        </div>
        <Search />
      </header>
      <div className="bg-gray-300 border-t-2 border-green-400 p-2 pt-7 mb-8" >
        <div className="flex flex-row flex-wrap items-center justify-center mb-4">
          <img 
          src={props.estate.profilePicture} 
          alt="Property" 
          className="h-28 w-28 mb-4 rounded-full object-cover" />
          <h2 className="ml-4 text-center text-2xl">
            {props.estate.address1+ " " + props.estate.address2}
          </h2>
        </div>
        {props.estate.price &&
          <div div className="flex flex-row justify-center mb-4">
            <h3 className=" text-center">{props.estate.price}</h3>
          </div>
        }
        
        
        <ul className="flex space-x-4 justify-center mb-4">
          {props.estate.bathroom &&
            <li className="border-r-2 border-l-2 border-green-400 p-1">{props.estate.bathroom} bath</li>
          }
          {props.estate.bedroom &&
            <li className="border-r-2 border-l-2 border-green-400 p-1">{props.estate.bedroom} bed</li>
          }
          {props.estate.lotArea &&
            <li className="border-r-2 border-l-2 border-green-400 p-1">{props.estate.lotArea} sq.ft. lot</li>
          }
        </ul>
        
        {props.estate.videoLink &&
          <Vimeo iframeSRC={props.estate.videoLink} />
        }
        
        {props.estate.soundScore &&
          <div div className="flex flex-col items-center mb-4">
            <h2 className="text-2xl mb-1">Noise Score</h2>
            <h2 
            className="text-4xl leading-9 bg-green-400 rounded-full"
            style={{padding: "0.5rem 0.5rem 0.7rem 0.5rem"}}>
              {props.estate.soundScore}
            </h2>
          </div>
        }
        
        {props.estate.audioDescription &&
          <div className="flex flex-col items-center space-x-4 ">
            <h3 className=" text-xl w-96 text-center mb-4">{props.estate.audioDescription}</h3>
            <h3 className="text-center">Data extracter from audio graph</h3>
          </div>
        }
        
        {props.estate.graphData &&
          <Graph dataPoints={props.estate.graphData} />
        }
        
      </div>
    </React.Fragment>
  );
};

export default EstateTemplate;