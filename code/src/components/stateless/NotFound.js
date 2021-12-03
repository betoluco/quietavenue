import React, {Fragment} from "react";
import { Link } from "react-router-dom";

import headerImage from  "../../images/headerImage.jpg";
import logo from "../../images/quietavenueLogoWhite.svg";
import HamburgerMenu from "../HamburgerMenu";
import Search from "../Search";
import BackArrow from "./BackArrow";

const NotFound = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    return(
        <Fragment>
            <header 
            className="flex flex-col items-center mb-6" 
            style={{
            backgroundImage: `url(${headerImage})`,
            backgroundSize: "cover",
            backgroundPosition:"50% 50%",
            backgroundRepeat:"no-repeat",
            }}>
                <div className="flex flex-row justify-between w-full p-2.5 mb-16">
                    <BackArrow color="#ffffff"/>
                    <Link className="flex flex-row items-center" to="/">
                        <img src={logo} alt="logo" className="h-10"/>
                        <h1 className="text-3xl text-white pl-2">QuietAvenue</h1>
                    </Link>
                    <HamburgerMenu color="#ffffff"/>
                </div>
                
                <h2 
                className="text-center text-white mb-16 text-lg"
                style={{textShadow: "2px 2px 4px #000000"}}>
                See and hear what goes on in front <br /> of your future home
                </h2>
                <Search />
            </header>
            
            <h1 className="text-center text-3xl">Ooops!, not found</h1>
        </Fragment>
    );
};

export default NotFound;