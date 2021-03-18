import React from "react";
import Vimeo from "./Vimeo";
import PropertyHeader from "./PropertyHeader";
import Graph from "./Graph";

const PropertyTemplate = (props) => {
    return (
        <React.Fragment>
            <PropertyHeader />
            <div className="Address">
                <div className="Address__image_cropper">
                    <img src={props.property.profilePicture} alt="Property" className="Address__image"/>
                </div>
                <h2 className="Address__text">
                    {props.property.address1+ " " + props.property.address2}
                </h2>
            </div>
            <Vimeo iframeSRC={props.property.videoLink} />
        </React.Fragment>
    );
};

export default PropertyTemplate;