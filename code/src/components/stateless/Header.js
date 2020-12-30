import React, { Fragment } from "react";
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";

// const Search = require('../Search');

const Header = ({ route }) =>{
  return(
    <Fragment>
      <header className="Header">
        <Link to="/"><h1 className="Header__name">Quietavenue.com</h1></Link>
        <Link to="/">
          <img src="https://s3-us-west-1.amazonaws.com/quietavenue.com/images/quietavenue_logo_bold.svg" className="Header__logo" />
        </Link>
        {/*<Search />*/}
      </header>
      { renderRoutes(route.routes) }
    </Fragment>
  );
};

export default {
  component: Header
};