import React, {Fragment} from "react";
import { Link } from "react-router-dom";

import HamburgerMenu from "../common/HamburgerMenu";

const NotFound = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    return(
        <Fragment>
            <h1 className="text-center text-3xl mb-3">Ooops!, not found</h1>
            <h4 className="text-center text-xl">
                To go home click 
                <Link to="/" className="text-blue-600"> here</Link>
            </h4>
        </Fragment>
    );
};

export default NotFound;