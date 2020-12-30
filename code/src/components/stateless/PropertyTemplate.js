import React from "react";
import Vimeo from "./Vimeo";

const PropertyTemplate = (props) => {
    console.log("Property template", props.property)
    return (
        <React.Fragment>
            <div className="Address">
                <div className="Address__image_cropper">
                    <img src={props.property.profile_picture} alt="place image" className="Address__image"/>
                </div>
                <h2 className="Address__text">
                    {props.property.number + " " + props.property.street + " "
                    + props.property.city + ", "+ props.property.zip_code + " "
                    + props.property.state}
                </h2>
            </div>
            <Vimeo iframeSRC={props.property.video_link} />
        </React.Fragment>
    );
};

export default PropertyTemplate;