import React, {Fragment} from "react";
import { Link } from "react-router-dom";

import logo from "../common/images/quietavenueLogoGreen.svg";
import HamburgerMenu from "../common/HamburgerMenu";

const NotFound = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    return(
        <Fragment>
            <header className="flex flex-row justify-between p-2.5 pb-7 border-b-2 border-green-400 mb-7">
                <Link className="flex flex-row items-center" to="/">
                    <img src={logo} alt="logo"/>
                    <h1 className="text-2xl text-green-600 pl-1">QuietAvenue</h1>
                </Link>
                <HamburgerMenu color="#000000"/>
            </header>
            <h1 className="text-center text-3xl mb-3">Ooops!, not found</h1>
            <h4 className="text-center text-xl">
                To go home click 
                <Link to="/" className="text-blue-600"> here</Link>
            </h4>
        </Fragment>
    );
};

export default NotFound;