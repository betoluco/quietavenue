import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import logo from "../images/quietavenueLogoGreen.svg";

const HamburgerMenu = props =>{
  const history = useHistory();
  
  const [showMenu, setShowMenu] = useState(false);
  
  const onMouseDownHandler = link =>{
    setShowMenu(false);
    history.push(link);
  };
  
  return (
    <Fragment>
      <button onClick={() => {setShowMenu(true);}}>
        <span className="block w-8 h-1 rounded-sm mb-1 bg-white"></span>
        <span className="block w-8 h-1 rounded-sm mb-1 bg-white"></span>
        <span className="block w-8 h-1 rounded-sm mb-1 bg-white"></span>
      </button>
      { showMenu &&
        <div className="fixed inset-0 z-10 w-full h-full bg-gray-400 bg-opacity-80">
          <ul className="absolute right-0 w-5/6 sm:w-1/2 md:w-72 bg-white p-3">
            <li>
              <div 
              className="flex flex-row items-center justify-between pb-3 border-b border-green-200 mb-2">
                <img src={logo} alt="logo" className="h-8"/>
                <button  onClick={() => {setShowMenu(false)}} className="text-4xl">&times;</button>
              </div>
            </li>
            <li 
            className="mb-2 text-base" 
            onMouseDown={() => onMouseDownHandler("/")}>
              Home
            </li>
            <li 
            className="mb-2 text-base"
            onMouseDown={() => onMouseDownHandler("/")}>
              For Agents
            </li>
            <li 
            className="mb-10 text-base"
            onMouseDown={() => onMouseDownHandler("/")}>
              For Prospective Buyers
            </li>
          </ul>
        </div>
      }
    </Fragment>
  );
};

export default HamburgerMenu;