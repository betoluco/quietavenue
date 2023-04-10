import React, { Fragment } from "react";

import Header from "../common/Header";
import HamburgerMenu from "../common/HamburgerMenu";
import logo from "../common/images/quietavenueLogoOp.svg";

const Contact = (props) =>{
  return(
    <Fragment>
      <Header />
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