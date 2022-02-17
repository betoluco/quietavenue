import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import logo from "./images/quietavenueLogoGreen.svg";
import closeMenu from "./images/closeMenu.svg";

const HamburgerMenu = props =>{
  const [showMenu, setShowMenu] = useState(false);
  
  const onClickHandler = () =>{
    setShowMenu(!showMenu);
  };
  
  return (
    <Fragment>
      <button onClick={onClickHandler}>
        <span className="hidden">menu button</span>
        <span 
        className="block w-8 h-1 rounded-sm mb-1"
        style={{backgroundColor:props.color}}>
        </span>
        <span 
        className="block w-8 h-1 rounded-sm mb-1"
        style={{backgroundColor:props.color}}>
        </span>
        <span className="block w-8 h-1 rounded-sm"
        style={{backgroundColor:props.color}}>
        </span>
      </button>
      { showMenu &&
        <div className="fixed inset-0 z-10 w-full h-full bg-gray-400 bg-opacity-80">
          <ul className="absolute right-0 w-5/6 sm:w-1/2 md:w-72 bg-white p-3">
            <li>
              <div 
              className="flex flex-row items-center justify-between pb-3 border-b border-green-200 mb-2">
                <img src={logo} alt="company logo" />
                <button onClick={onClickHandler}>
                  <img src={closeMenu} alt="close menu" />
                </button>
              </div>
            </li>
            <li className="mb-2 hover:bg-green-200">
              <Link 
              className="text-base block"
              to="/"
              onClick={onClickHandler}>
                Home
              </Link>
            </li>
            <li className="mb-2 hover:bg-green-200">
              <Link 
              className="text-base block"
              to="/trial"
              onClick={onClickHandler}>
                For Agents
              </Link>
            </li>
            <li 
            className="mb-10 hover:bg-green-200">
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