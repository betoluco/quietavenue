import React, { Fragment, useEffect } from "react";
import {Link} from 'react-router-dom';

import Search from "../common/Search";
import deleteFilter from "./deleteFilter.svg";

const FilterTemplate = (props) =>{
    return (
        <Fragment>
            <Search/>
            <div className="inline-block m-2 ml-6 mb-10">
                <div className="flex flex-row justify-center items-center p-2 
                rounded-full border border-stone-400 bg-green-600 font-medium">
                    <h2 className="text-lg text-white pr-2.5">{props.filter}</h2>
                    <Link to="/">
                        <img className="w-6" src={deleteFilter} alt="delete filter"/>
                    </Link>
                </div>
            </div>
            {props.content}
        </Fragment>
    );
};

export default FilterTemplate;