import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import logo from "./images/quietavenueLogoOp.svg";
import pointer from "./images/pointerOp.svg";

const HamburgerMenu = props =>{
  const [showMenu, setShowMenu] = useState(false);
  
  const onClickHandler = () =>{
    setShowMenu(!showMenu);
  };
  
  return (
    <Fragment>
      <button onClick={onClickHandler}  className="mr-2">
        <span className="hidden">menu button</span>
        <span 
        className="block w-6 md:w-8 h-1 bg-stone-800 rounded-sm mb-1 md:mb-1.5">
        </span>
        <span 
        className="block w-6 md:w-8 h-1 bg-stone-800 rounded-sm mb-1 md:mb-1.5">
        </span>
        <span 
        className="block w-6 md:w-8 h-1 bg-stone-800 rounded-sm">
        </span>
      </button>
      { showMenu &&
        <div 
        onClick={onClickHandler}
        className="fixed inset-0 z-10 w-full h-full bg-gray-400 bg-opacity-80">
          <ul className="absolute right-0 w-5/6 sm:w-1/2 md:w-72 bg-white p-3 border-l 
          border-b border-green-600 rounded-l-md rounded-br-md">
            <li>
              <div 
              className="flex flex-row items-center justify-between pb-5 border-b border-green-200 mb-2">
                <img src={logo} alt="company logo"   className="h-14"/>
                <button onClick={onClickHandler}>
                  <span className="hidden">close menu</span>
                  <span 
                  className="block bg-stone-800 w-6 h-1 rounded-sm -mb-[4px] -rotate-45">
                  </span>
                  <span 
                  className="block bg-stone-800 w-6 h-1 rounded-sm rotate-45">
                  </span>
                </button>
              </div>
            </li>
            <Link 
            to="/">
              <li className="py-4 pl-2 hover:bg-green-200 rounded-md" >
                <div className="flex flex-row items-center text-lg text-stone-800 font-semibold">
                  <img src={pointer} alt="pointer" className="h-2 pr-2.5"/>
                    Home
                </div>
              </li>
            </Link>
            <Link
            to="/workFlow">
              <li className="py-4 pl-2 hover:bg-green-200 rounded-md" >
                <div className="flex flex-row items-center text-lg text-stone-800 font-semibold">
                  <img src={pointer} alt="pointer" className="h-2 pr-2.5"/>
                  Schedule your free trial
                </div>
              </li>
            </Link>
            <Link
            to="/mission">
              <li className="py-4 pl-2 hover:bg-green-200 rounded-md" >
                <div className="flex flex-row items-center text-lg text-stone-800 font-semibold">
                  <img src={pointer} alt="pointer" className="h-2 pr-2.5"/>
                  How it works?
                </div>
              </li>
            </Link>
            <Link
            to="/FAQ">
              <li className="py-4 pl-2 hover:bg-green-200 rounded-md" >
                <div className="flex flex-row items-center text-lg text-stone-800 font-semibold">
                  <img src={pointer} alt="pointer" className="h-2 pr-2.5"/>
                  FAQ
                </div>
              </li>
            </Link>
            <Link to="/contact">
              <li className="py-4 pl-2 mb-80 hover:bg-green-200 rounded-md">
                <div className="flex flex-row items-center text-lg text-stone-800 font-semibold">
                  <img src={pointer} alt="pointer" className="h-2 pr-2.5"/>
                    Contact us
                </div>
              </li>
            </Link>
          </ul>
        </div>
      }
    </Fragment>
  );
};

export default HamburgerMenu;