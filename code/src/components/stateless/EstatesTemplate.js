import React, {Fragment} from "react";
import { useSelector } from "react-redux";

import Card from "./Card";

const EstatesTemaplate = (props) =>{
    let filter = props.filter || "";
    const estate = useSelector( state => state.[props.estates[0]]);
   
    if (filter === "cityId") filter = "Filter: " + estate.city
    if (filter === "zipCode") filter = "Filter: " + estate.zipCode;
    
    const cardsList = props.estates.map( estate =>{
        return <Card estate={estate}/>;
    });
    
    return (
        <Fragment>
            <div>{filter}</div>
            <div>{cardsList}</div>
        </Fragment>
    );
};

export default EstatesTemaplate;