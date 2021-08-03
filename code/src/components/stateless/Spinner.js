import React from "react";

const Spinner = (props) =>{
    return (
        <div className="flex flex-row justify-center mt-20">
            <svg class="animate-spin  h-20 w-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#34d399" stroke-width="4"></circle>
                <path class="opacity-75" fill="#059669" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    );
};

export default Spinner;