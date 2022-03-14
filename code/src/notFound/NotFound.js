import React, {Fragment} from "react";
import { Link } from "react-router-dom";

import HamburgerMenu from "../common/HamburgerMenu";
import Logo from "../common/Logo";

const NotFound = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    return(
        <Fragment>
            <header className="flex flex-row justify-between px-3 mt-2.5 pb-4 border-b border-green-400 mb-7">
                <Logo />
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