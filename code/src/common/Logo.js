import React from "react";
import { Link } from "react-router-dom";

import logo from "./images/quietavenueLogoOp.svg";

const Logo = (props) =>{
  return (
    <Link className="flex flex-row items-center" to="/">
        <img src={logo} alt="Company logo" className="md:h-9" />
        <h1 className="text-3xl md:text-4xl tracking-wide text-stone-800 pl-2">
            Quiet<span className="text-green-600">A</span>venue
        </h1>
    </Link>
  );
};

export default Logo;