import React from "react";
import searchButton from "../../images/searchButtonIcon.svg";

const SearchInput = props =>{
  return (
    <div className="flex flex-row justify-center">
      <form className="flex flex-row w-4/5 md:w-3/6 lg:w-2/5 mb-10">
        <input 
        className="w-full p-2 pr-8 rounded border border-gray-400 focus:ring focus:ring-green-600 focus:outline-none focus:border-transparent"
        onChange={props.onChangeHandler}
        onBlur={props.onBlurHandler}
        onFocus={props.onFocusHandler}
        value={props.userInput}
        type="text"
        placeholder="zip code, city, or address"/>
        <img 
        src={searchButton}
        alt="search button"
        className="-ml-6"/>
      </form>
      <ul 
      style={{marginTop: "45px"}}
      className="absolute w-4/5 md:w-3/6 lg:w-2/5 bg-white rounded">
        {props.suggests}
      </ul>
    </div>
  );
};

export default SearchInput;