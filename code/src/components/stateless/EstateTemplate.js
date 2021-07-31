import React from "react";
import Vimeo from "./Vimeo";
import EstateHeader from "./EstateHeader";
import Graph from "../Graph";

const EstateTemplate = (props) => {
    return (
        <React.Fragment>
            <EstateHeader />
            <div className="Address">
                <div className="Address__image_cropper">
                    <img src={props.estate.profilePicture} alt="Property" className="Address__image"/>
                </div>
                <h2 className="Address__text">
                    {props.estate.address1+ " " + props.estate.address2}
                </h2>
            </div>
            {props.estate.videoLink &&
                <Vimeo iframeSRC={props.estate.videoLink} />
            }
            {props.estate.graphData &&
                <Graph dataPoints={props.estate.graphData} />
            }
        </React.Fragment>
    );
};

export default EstateTemplate;