import React, { Fragment } from "react";
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";



const Header = ({ route }) =>{
  return(
    <Fragment>
      <header className="Header">
        <Link className="Header__link" to="/">
          <h1 className="Header__name">QuietAvenue.com</h1>
        </Link>
      </header>
      { renderRoutes(route.routes) }
    </Fragment>
  );
}; 

const headerExport = {
  component: Header
};

export default headerExport;