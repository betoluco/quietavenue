import React, { Fragment } from "react";

import Phone from "../common/Phone";
import Email from "../common/Email";
import callUs from "./callUs.jpg";
import technician from "./technician.jpg";
import dataAnalysis from "./dataAnalysis.jpg";

const WorkFlow = (props) =>{
  return(
    <Fragment>
      <h2 
      data-cy=""
      className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center mb-12 text-stone-800 font-semibold">
        Schedule your <span className="text-green-600" >free trial!</span>
      </h2>
      
      <div className="flex justify-center px-3 mb-16 py-16 bg-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg">
          <div className="flex flex-col bg-white rounded-md px-2 py-2">
            <h3 className="mb-0.5 text-center text-lg text-stone-800 font-semibold">
              <span className="text-green-600 text-xl">1. </span>Call us!
            </h3>
            <img src={callUs} className="mb-2 aspect-auto border border-strone-200 w-full"/>
            <p className="text-center text-base text-stone-800">Schedule an appointment by calling</p>
            <h2 className="text-center text-2xl text-green-600 font-semibold">
              <Phone />
            </h2>
            <p className="text-center text-base text-stone-800">or send us an email</p>
            <h2 className="text-center text-2xl text-green-600 font-semibold">
              <Email />
            </h2>
          </div>
          
          <div className="flex flex-col bg-white rounded-md px-2 py-2">
            <h3 className="mb-0.5 text-center text-lg text-stone-800 font-semibold">
              <span className="text-green-600 text-xl">2. </span>Get a visit form our technician
            </h3>
            <img src={technician} className="mb-2 aspect-auto border border-strone-200 w-full"/>
            <p className=" mb-4 text-center text-base text-stone-800">A QuietAvenue technician will go to your property and set up discrete recording equipment</p>
          </div>
          
          <div className="flex flex-col bg-white rounded-md px-2 py-2">
            <h3 className="mb-0.5 text-center text-lg text-stone-800 font-semibold">
              <span className="text-green-600 text-xl">3. </span>See the analysis of your property
            </h3>
            <img src={dataAnalysis} className="mb-2 aspect-auto border border-strone-200 w-full"/>
            <p className=" mb-4 text-center text-base text-stone-800">A week later the analysis of your property’s data will be available in QuietAvenue.com</p>
          </div>
          
        </div>
      </div>
      <div className="flex justify-center mx-3 mb-6">
        <p className="text-base text-stone-800 max-w-screen-md">Prospective buyers can find your property’s information through a google search, or you can provide a direct link in your marketing materials or MLS/Zillow/Redfin listing Call now to set up your listing’s recording</p>
      </div>
    </Fragment>
  ) ; 
};

export default WorkFlow;