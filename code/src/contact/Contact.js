import React, { Fragment } from "react";

import Logo from "../common/Logo";
import HamburgerMenu from "../common/HamburgerMenu";
import BackArrow from "../common/BackArrow";
import Slogan from "../common/Slogan";

const Contact = (props) =>{
  return(
    <Fragment>
      <header className="mb-4" >
        <div className="flex flex-row justify-between mx-3 mt-2.5 mb-4">
          <BackArrow />
          <Logo />
          <HamburgerMenu/>
        </div>
        <Slogan />
      </header>
      <div className="flex flex-col items-center p-2.5">
        <h4 className="mb-4 max-w-screen-md text-lg">
          Any matter related to this web site, please feel free to contact us
        </h4>
        <h1 className="mb-6 text-center text-2xl font-bold text-green-600">
          +650-391-6820
        </h1>
        
      </div>
    </Fragment>
  ) ; 
};

export default Contact;