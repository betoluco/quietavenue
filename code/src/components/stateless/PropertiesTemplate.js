import React, { Fragment } from "react";

import Search from "../Search";

const PropertiesTemplate = props =>{
    return (
        <Fragment>
            <div className="Description">
                <h3 className="">See and hear what goes on in front <br /> of your future home</h3>
                <Search />
            </div>
            <div className="Properties">
                {props.listCards}
            </div>
        </Fragment>
    );
};

export default PropertiesTemplate;