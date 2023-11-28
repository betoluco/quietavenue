import React from 'react';
import { Link } from "react-router-dom";

import logo from "./images/quietavenueLogoOp.svg";

const Footer = () =>{
    return(
        <div className="px-3 flex flex-col w-full bg-stone-100 py-6 mt-24">
            <img src={logo} alt="Company logo" className="h-7 md:h-9 mb-3" />
            <div className="mb-4 flex justify-center">
                <div className="flex justify-center flex-wrap max-w-sm">
                    <div className="text-xs text-stone-800 mr-3 shrink-0">
                        <Link to="/">
                            Home
                        </Link>
                    </div>
                    <div className="text-xs text-stone-800 mr-3 shrink-0">
                        <Link to="/workFlow">
                            Schedule your free trial
                        </Link>
                    </div>
                    <div className="text-xs text-stone-800 mr-3 shrink-0">
                        <Link to="/mission">
                            How it works?
                        </Link>
                    </div>
                    <div className="text-xs text-stone-800 mr-3 shrink-0">
                        <Link to="/FAQ">
                            FAQ
                        </Link>
                    </div>
                    <div className="text-xs text-stone-800 mr-3 shrink-0">
                        <Link to="/contact">
                            Contact us
                        </Link>
                    </div>
                </div>
            </div>
            <p className="text-center text-xs text-stone-800">
                quietavenue.com property of quietavenue LLC all rights reserved
            </p>
        </div>
    );
};

export default Footer