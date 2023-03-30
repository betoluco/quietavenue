import React, { Fragment } from "react";

import Logo from "../common/Logo";
import HamburgerMenu from "../common/HamburgerMenu";
import callUs from "./callUs.jpg";
import technician from "./technician.jpg";
import dataAnalysis from "./dataAnalysis.jpg";

const WorkFlow = (props) =>{
  return(
    <Fragment>
      <header className="mb-3" >
        <div className="flex flex-row justify-between mx-3 mt-2.5 pb-2 mb-4 border-b border-strone-100">
          <Logo />
          <HamburgerMenu/>
        </div>
      </header>
      <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center mb-12 text-stone-800 font-semibold">
        How it works?
      </h2>
      
      <div className="flex justify-center px-3 mb-16 py-16 bg-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-lg">
          <div className="flex flex-col bg-white rounded-md px-2 py-2">
            <h3 className="mb-0.5 text-center text-lg text-stone-800 font-semibold">Call us!</h3>
            <img src={callUs} className="mb-2 aspect-auto border border-strone-200 w-full"/>
            <p className="text-center text-base text-stone-800">Schedule an appointment by calling</p>
            <h2 className="text-center text-2xl text-green-600 font-semibold">
              +650-391-6820
            </h2>
            <p className="text-center text-base text-stone-800">or writing us at</p>
            <h2 className="text-center text-2xl text-green-600 font-semibold">
              sales@quietavenue.com
            </h2>
          </div>
          
          <div className="flex flex-col bg-white rounded-md px-2 py-2">
            <h3 className="mb-0.5 text-center text-lg text-stone-800 font-semibold">Get a visit form our technician</h3>
            <img src={technician} className="mb-2 aspect-auto border border-strone-200 w-full"/>
            <p className=" mb-4 text-center text-base text-stone-800">A technician will go to your property and set up discrete recording equipment</p>
          </div>
          
          <div className="flex flex-col bg-white rounded-md px-2 py-2">
            <h3 className="mb-0.5 text-center text-lg text-stone-800 font-semibold">See the analysis of your property</h3>
            <img src={dataAnalysis} className="mb-2 aspect-auto border border-strone-200 w-full"/>
            <p className=" mb-4 text-center text-base text-stone-800">A week later the analysis of your property’s data will be available in our website</p>
          </div>
          
        </div>
      </div>
      <div className="flex justify-center mx-3 mb-6">
        <p className="text-center text-xl text-stone-800 max-w-screen-md">Prospective buyers can find your property’s information through a google search, or you can provide a direct link in your marketing materials or MLS/Zillow/Redfin listing Call now to set up your listing’s recording</p>
      </div>
    </Fragment>
  ) ; 
};

export default WorkFlow;