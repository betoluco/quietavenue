import React from "react";

const ColorScale = (props) => {
    return (
        <div className="flex flex-col w-72 mb-6 select-none">
            <div className="flex flex-row">
                <div 
                className="w-full" 
                style={{
                    height:"20px",
                    backgroundColor: "#808080",
                    background: "linear-gradient(90deg, rgba(128,128,128,1) 0%, rgba(255,0,0,1) 100%)"
                }}>
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