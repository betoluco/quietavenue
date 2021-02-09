import React from "react";

import Suggestions from "./Suggestions";

const SearchInput = props =>{
  const citySuggest = props.citySuggest.map( city =>{
    return <Suggestions 
      id={city} 
      text={city}
      to="/"
      onClickHandler={props.onClickHandler} />;
  });
  
  const propertySuggest = props.propertySuggest.map( property =>{
    return <Suggestions
      id={property.id}
      text={property.address}
      to={"property/" + property.id}
      onClickHandler={props.onClickHandler} />;
  });
  
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
        {citySuggest.length > 0 && <li className="Suggest__city" key="Cities">City</li>}
        {citySuggest}
        
        {propertySuggest.length > 0 && <li className="Suggest__property" key="Properties">Properties</li>}
        {propertySuggest}
      </ul>
    </div>
  );
};

export default SearchInput;