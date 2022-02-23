import React, { Fragment } from "react";

import Header from "../common/Header";

const FreeTrial = (props) =>{
  return(
    <Fragment>
      <Header />
      <div className="flex flex-col items-center p-2.5">
        <h4 className="mb-4 max-w-screen-md ">
          When you enroll your property for a free trial,* you provide prospective customers with the information they need to make an informed purchase.
        </h4>
        <h4 className="mb-6 max-w-screen-md">
          One of our recording technicians will go to your property and set up discrete recording equipment. A week later the analysis of your property’s data will be available in our website. Prospective buyers can find your property’s information through a google search, or you can provide a direct link in your marketing materials or MLS/Zillow/Redfin listing Call now to set up your listing’s recording.
        </h4>
        <h1 className="mb-6 text-center text-2xl font-bold text-green-600">
          Call or Text to Enroll Free! +650-391-6820
        </h1>
        <h4 className="mb-10 max-w-screen-md">
          * Free trial limited to one property per agent.
        </h4>
      </div>
    </Fragment>
  ) ; 
};

export default FreeTrial;