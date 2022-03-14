import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import logo from "./images/quietavenueLogoOp.svg";
import pointer from "./images/pointerOp.svg";
import closeMenu from "./images/closeMenuOp.svg";

const HamburgerMenu = props =>{
  const [showMenu, setShowMenu] = useState(false);
  
  const onClickHandler = () =>{
    setShowMenu(!showMenu);
  };
  
  return (
    <Fragment>
      <button onClick={onClickHandler} data-cy="openHamburgerMenu" className="">
        <span className="hidden">menu button</span>
        <span 
        className="block w-5 md:w-8 h-0.5 md:h-1 bg-stone-800 rounded-sm mb-1 md:mb-1.5">
        </span>
        <span 
        className="block w-5 md:w-8 h-0.5 md:h-1 bg-stone-800 rounded-sm mb-1 md:mb-1.5">
        </span>
        <span 
        className="block w-5 md:w-8 h-0.5 md:h-1 bg-stone-800 rounded-sm">
        </span>
      </button>
      { showMenu &&
        <div className="fixed inset-0 z-10 w-full h-full bg-gray-400 bg-opacity-80">
          <ul className="absolute right-0 w-5/6 sm:w-1/2 md:w-72 bg-white p-3 border-l-2 
          border-b-2 border-green-600 rounded-l-md rounded-br-md" 
          data-cy="hamburgerMenu">
            <li>
              <div 
              className="flex flex-row items-center justify-between pb-5 border-b border-green-200 mb-2">
                <img src={logo} alt="company logo"   className="h-14"/>
                <button onClick={onClickHandler} data-cy="closeHamburgerMenu">
                  <img src={closeMenu} alt="close menu" className="h-8 mr-3"/>
                </button>
              </div>
            </li>
            <li className="py-4 hover:bg-green-200 rounded-md text-stone-800 font-semibold" 
            data-cy="hamburgerMenuHome">
              <div 
              className="flex flex-row items-center">
                <img src={pointer} alt="pointer" className="h-2"/>
                <Link 
                className="text-lg pl-2"
                to="/"
                onClick={onClickHandler}>
                  Home
                </Link>
              </div>
            </li>
            <li className="py-4 pl-4 hover:bg-green-200 rounded-md text-stone-800 font-semibold" 
            data-cy="hamburgerMenuForAgents">
              <Link 
              className="text-base block"
              to="/trial"
              onClick={onClickHandler}>
                For Agents
              </Link>
            </li>
            <li className="py-4 pl-4 mb-80 hover:bg-green-200 rounded-md text-stone-800 font-semibold" 
             data-cy="hamburgerMenuForBuyers">
              <Link 
              className="text-base block"
              to="/"
              onClick={onClickHandler}>
                For Prospective Buyers
              </Link>
            </li>
          </ul>
        </div>
      }
    </Fragment>
  );
};

export default HamburgerMenu;