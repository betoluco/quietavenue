import React from "react";
import { useHistory } from "react-router-dom";

import leftArrow from "../../images/leftArrow.svg";

const BackArrow = (props) => {
    const history = useHistory();
    
    const onClickHandler = event =>{
        if(history.length > 0){
            history.goBack()
        }else{
            history.push("/")
        }
    };
    
    return (
        <button onClick={onClickHandler}>
            <img src={leftArrow} alt="back arrow" className="h-6"/>
        </button>       
    );
  
};

export default BackArrow;