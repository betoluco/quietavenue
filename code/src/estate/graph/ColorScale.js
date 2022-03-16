import React from "react";

const ColorScale = (props) => {
    return (
        <div className="flex flex-col w-72 mb-6 select-none">
            <div className="flex flex-row">
                <div 
                className="w-full border border-stone-400" 
                style={{
                    height:"20px",
                    backgroundColor: "#808080",
                    background: "linear-gradient(90deg, rgba(255,201,201,1) 0%, rgba(255,0,0,1) 100%)"
                }}>
                </div>
                
                
            </div>
            <div className="flex flex-row justify-between">
                <h4 className="text-stone-800 font-semibold">low</h4>
                <h4 className="text-stone-800 font-semibold">High</h4>
            </div>
        </div>
    );
};

export default ColorScale;