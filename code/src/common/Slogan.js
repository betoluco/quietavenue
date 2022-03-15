import React, { Fragment } from "react";

import headerImage from  "../common/images/headerImage.jpg";
import Search from "../common/Search";

const Slogan = (props) =>{
    return(
        <div className="border-y rounded-sm border-green-600 pb-72"
        style={{
        backgroundImage: `linear-gradient(to bottom, hsla(0, 0%, 0%, 0.4), hsla(0, 0%, 0%, 0.1)),
        url(${headerImage})`,
        backgroundSize: "cover",
        backgroundPosition:"50% 50%",
        backgroundRepeat:"no-repeat",
        }}>
            <h2 
            className="text-center md:text-3xl text-white font-medium tracking-wide
            mb-10 mt-12 px-3 mx-auto max-w-xl drop-shadow-lg">
                See and hear what goes on in front of your future home
            </h2>
            <Search />
        </div>
      
    ) ; 
};

export default Slogan;