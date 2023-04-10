import React from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

import logo from "./images/quietavenueLogoOp.svg";

const Header = (props) =>{
  return (
    <header className="flex flex-row justify-between px-3 mt-2.5 pb-4 mb-12 border-b border-stone-200">
      <Link className="flex flex-row items-center" data-cy="linkToHome" to="/">
          <img src={logo} alt="Company logo" className="h-6 md:h-7" />
          <h1 className="text-2xl md:text-3xl tracking-wide text-stone-800 pl-2"
          data-cy="companyName">
              Quiet<span className="text-green-600">A</span>venue
          </h1>
      </Link>
        <HamburgerMenu />
    </header>
  );
};

export default Header;