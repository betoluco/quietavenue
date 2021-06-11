import React, { Fragment } from "react";
import searchButton from "../../images/searchButtonIcon.svg"

const SearchInput = props =>{
  return (
    <Fragment>
      <form className="flex flex-row justify-center pb-6 ">
        <input 
        className="Suggest__input"
        type="search" 
        onChange={props.onChangeHandler} 
        value={props.userInput}/>
        <img 
        src={searchButton}
        alt="search button"
        className="Suggest__image"/>
      </form>
      <ul className="Suggest__list">
        {props.suggest}
      </ul>
    </Fragment>
  );
};

export default SearchInput;