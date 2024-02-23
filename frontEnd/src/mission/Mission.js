import React from "react";
import { Link } from "react-router-dom";

import logo from "../common/images/quietavenueLogoOp.svg";

const Mission = (props) =>{
    return (
        
        <div className="mb-12   flex flex-col items-center">
            <h2
            className="text-2xl px-3 sm:text-3xl md:text-4xl xl:text-5xl text-center mb-12 text-stone-800 font-semibold">
                How it <span className="text-green-600" >works?</span>
            </h2>
            <div className="w-full flex flex-col items-center bg-stone-200 py-12">
                <div className="px-3 max-w-screen-md">
                    <p className="mb-6 text-base text-stone-800">
                        In QuietAvenue we are committed to help you get the right house for you. To achieve this, we 
                        record audio and video of the property you are interested in and analyzed with proprietary AI.
                    </p>
                    
                    <p className="mb-8 text-base text-stone-800">
                        That way you will know what will be like to live there, how noise the zone is, what goes on 
                        in front of your future home.
                    </p>
                    <div className="flex justify-center w-full">
                        <img src={logo} alt="Company logo" className="h-24 md:h-24 mb-8" />
                    </div>
                    <p className="mb-12 text-base text-stone-800">
                        If you can't find the house you are interested in our website, contact your realtor and 
                        suggest him/her the service QuietAvenue provides ( 
                        <Link to="/FAQ" className="text-blue-600 hover:text-blue-800">
                            see our FAQ
                        </Link>
                        )
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Mission;