import React, { Fragment } from "react";
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";
import Search from "../Search";

const Header = ({ route }) =>{
  return(
    <Fragment>
      <header className="Header">
        <Link className="Header__link" to="/">
          <h1 className="Header__name">QuietAvenue.com</h1>
        </Link>
        <h3 className="Header__slogan">See and hear what goes on in front <br /> of your future home</h3>
        <Search />
      </header>
      { renderRoutes(route.routes) }
    </Fragment>
  );
}; 


export default Header;