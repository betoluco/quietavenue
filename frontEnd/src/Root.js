import React, { Fragment, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Outlet } from "react-router-dom";

import Header from "./common/Header";
import Footer from "./common/Footer";

const Root = ( props ) => {
    let location = useLocation()
    useEffect( () => {
        window.gtag('config', 'G-439GZCCJLJ', {
            page_title: location,
            page_path: location,
        });
        
    }, [location]);
    
    return (
        <Fragment>
            <Header />
                <Outlet />
            <Footer />
        </Fragment>
    );
};


export default Root;