import React from "react";
import { useHistory } from "react-router-dom";

const BackArrow = (props) => {
    const history = useHistory();
    
    
    const onClickHandler = event =>{
        if(history.length > 0){
            history.goBack();
        }else{
            history.push("/");
        }
    };
    
    return (
        <button onClick={onClickHandler}>
            <span 
            className="block w-6 h-1 rounded-sm mb-2.5"
            style={{
                backgroundColor:props.color,
                transform: "rotate(-45deg)"  
            }}>
            </span>
            <span 
            className="block w-6 h-1 rounded-sm"
            style={{
            backgroundColor:props.color,
            transform: "rotate(45deg)"
            }}>
            </span>
        </button>       
    );
  
};

export default BackArrow;