import React from "react";

const ColorScale = (props) => {
    return (
        <div className="flex flex-col w-72 mb-6 select-none">
            <div className="flex flex-row">
                <div 
                className="w-full" 
                style={{backgroundColor: "#2A00D5", height:"20px"}}>
                </div>
                <div
                className="w-full"
                style={{backgroundColor: "#63009E", height:"20px"}}>
                </div>
                <div
                className="w-full"
                style={{backgroundColor: "#A1015D", height:"20px"}}>
                </div>
                <div 
                className="w-full"
                style={{backgroundColor: "#D80027", height:"20px"}}>
                </div>
                <div 
                className="w-full"
                style={{backgroundColor: "#FE0002", height:"20px"}}>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <h4 className="">low</h4>
                <h4 className="">High</h4>
            </div>
        </div>
    );
};

export default ColorScale;