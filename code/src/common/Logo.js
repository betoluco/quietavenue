import React from "react";
import { Link } from "react-router-dom";

import logo from "./images/quietavenueLogoOp.svg";

const Logo = (props) =>{
  return (
    <Link className="flex flex-row items-center" data-cy="linkToHome" to="/">
        <img src={logo} alt="Company logo" className="h-6 md:h-7" />
        <h1 className="text-2xl md:text-3xl tracking-wide text-stone-800 pl-2"
        data-cy="companyName">
            Quiet<span className="text-green-600">A</span>venue
        </h1>
    </Link>
  );
};

export default Logo;