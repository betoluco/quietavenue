import React, { Fragment } from "react";

const PropertiesTemplate = props =>{
    return (
        <Fragment>
            <div className="Properties">
                {props.listCards}
            </div>
        </Fragment>
    );
};

export default PropertiesTemplate;