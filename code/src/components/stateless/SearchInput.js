import React from "react";

const SearchInput = props =>{
  return (
    <div className="Suggest">
      <form className="Suggest__form Suggest__form--small">
        <input 
        className="Suggest__input"
        type="search" 
        onChange={props.onChangeHandler} 
        value={props.userInput}/>
        <img 
        src="https://s3-us-west-1.amazonaws.com/quietavenue.com/images/search_button_icon.svg"
        alt="search_button"
        className="Suggest__image"/>
      </form>
      <ul className="Suggest__list">
        {props.suggest}
      </ul>
    </div>
  );
};

export default SearchInput;