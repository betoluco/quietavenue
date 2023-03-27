import React, { Fragment } from "react";

import Logo from "../common/Logo";
import HamburgerMenu from "../common/HamburgerMenu";
import logo from "../common/images/quietavenueLogoOp.svg";

const Contact = (props) =>{
  return(
    <Fragment>
      <header className="mb-3" >
        <div className="flex flex-row justify-between mx-3 mt-2.5 pb-2 mb-2 border-b border-strone-100">
          <Logo />
          <HamburgerMenu/>
        </div>
      </header>
      <div className="flex flex-col items-center p-2.5">
        <img src={logo} alt="Company logo" className="h-24 md:h-24 mb-10" />
        <h4 className="mb-4 max-w-screen-md text-lg font-medium text-center">
          Any matter related to this web site, please feel free to contact us
        </h4>
        <h1 className="mb-6 text-center text-2xl font-bold text-stone-800">
          +650-391-6820
        </h1>
        
      </div>
    </Fragment>
  ) ; 
};

export default Contact;