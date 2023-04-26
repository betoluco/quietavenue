import React from "react";

import spectrogram from "./spectrogram.webp";
import logo from "../common/images/quietavenueLogoOp.svg";

const Mission = (props) =>{
    return (
        
        <div className="mb-12  font-medium flex flex-col items-center">
            <h2 className="text-2xl px-3 sm:text-3xl md:text-4xl xl:text-5xl text-center mb-12 text-stone-800 font-semibold">
                How it <span className="text-green-600" >works?           </span>
            </h2>
            <div className="w-full flex flex-col items-center bg-stone-200 py-12">
                <div className="px-3 text-base text-stone-800 max-w-screen-md">
                    <p className="mb-6 text-base text-stone-800">
                        In QuietAvenue we are committed to help you get the right house for you. To achieve this, we record audio on video of the property you are interested in and processes it using our artificial intelligence.
                    </p>
                    <div className="flex justify-center w-full mb-6">
                        <img src={spectrogram} className="aspect-auto max-w-md"/>
                    </div>
                    <p className="mb-8 text-base text-stone-800">
                        That way you can get an idea of what will be like to live there, how noise the zone is, what goes on in front of the home you are interested.
                    </p>
                    <div className="flex justify-center w-full">
                        <img src={logo} alt="Company logo" className="h-24 md:h-24 mb-8" />
                    </div>
                    <p>
                        If you can find the house you are interested in our website, contact your realtor and suggest him/her the service QuietAvenue provides
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Mission;