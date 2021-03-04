import React from "react";

const SearchInput = props =>{
  // const suggestions = [<li className="">City</li>]
  
  // if (props.citySuggest.length == 0){
  //   suggestions.append(<li className="">No Suggestions</li>)
  // }else {
  //   const citySuggest = props.citySuggest.map( city =>{
  //     return <li
  //       className=""
  //       key={city.key}
  //       onClick={ () => props.onClickHandler( props.text ) }>
  //           <Link to={props.to}>
  //               {props.text}
  //           </Link>
  //       </li>
  //   });
  // }
  
  
  // const propertySuggest = props.propertySuggest.map( property =>{
  //   return <Suggestions
  //     id={property.id}
  //     text={property.address}
  //     to={"property/" + property.id}
  //     onClickHandler={props.onClickHandler} />;
  // });
  
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
      {/*<ul className="Suggest__list">
        {citySuggest.length > 0 && <li className="Suggest__city" key="Cities">City</li>}
        {citySuggest}
        
        {propertySuggest.length > 0 && <li className="Suggest__property" key="Properties">Properties</li>}
        {propertySuggest}
      </ul>*/}
    </div>
  );
};

export default SearchInput;