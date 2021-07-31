import React from "react";
import searchButton from "../../images/searchButtonIcon.svg";

const SearchInput = props =>{
  return (
    <div className="flex flex-row justify-center">
      <form className="flex flex-row w-4/5 md:w-3/6 lg:w-2/5 pb-6">
        <input 
        className="w-full p-2 rounded "
        onChange={props.onChangeHandler}
        onBlur={props.onBlurHandler}
        onFocus={props.onFocusHandler}
        value={props.userInput}/>
        <img 
        src={searchButton}
        alt="search button"
        className="-ml-5"/>
      </form>
      <ul 
      style={{backgroundImage: `url(${headerImage})`}}
      className="absolute w-4/5 md:w-3/6 lg:w-2/5 bg-white rounded">
        {props.suggests}
      </ul>
    </div>
  );
};

export default SearchInput;