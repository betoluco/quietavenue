import React, {useState, useEffect } from "react";
import axios from "axios"; 
import { useHistory } from "react-router-dom";

import searchButton from "./images/searchButtonIcon.svg";

const Search = props =>{
  let history = useHistory();
  const [searchInputText, setSearchInputText] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  
  useEffect(() => {
    (async function () {
      if (searchInputText.length > 1 && searchInputText.length < 200){ //avoid attacks by input overload
        try{ 
          const response = await axios("https://quietavenue.com/api/search?search=" + searchInputText );
        
          let suggestList = [];
          
          response.data.forEach( filter =>{
            if(filter.elements.length){
              suggestList.push(
                <li 
                className="p-1 bg-white text-sm w-full"
                key={filter.filter}>
                  {filter.filter}
                </li>
              );
              filter.elements.forEach( element =>{
                suggestList.push(
                  <li 
                  key={element.link}
                  onMouseDown={ () => onMouseDown(element.link)}
                  className="flex p-1 pl-2.5 bg-white text-lg hover:bg-green-200">
                    {element.name}
                  </li>
                );
              });
            }
          });
          
          if(!suggestList.length){
            suggestList.push(
              <li 
              className="flex p-1 bg-white text-sm border-b-2 border-green-600 border-opacity-50"
              key="No results">
                No results
              </li>
            );
          }
        
          setSuggest(suggestList);
          setShowSuggest(true);
        }catch{
          setShowSuggest(false);
        }
      }else{
        setSuggest([]);
        setShowSuggest(false);
      }
    })();
  }, [searchInputText]);
  
  
  const onChangeHandler = event =>{
    setSearchInputText(event.target.value);
  };
  
  const onMouseDown = link =>{
    history.push(link);
    setSearchInputText("");
  };
  
  const onBlurHandler = event =>{
    setShowSuggest(false);
  };
  
  const onFocusHandler = event => {
    if(searchInputText.length > 1){
      setShowSuggest(true);
    }
  };
  
  return (
    <div 
    className="flex justify-center mb-8 w-full">
      <form className="w-11/12 md:max-w-screen-md"
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}>
        <div className="flex">
          <label htmlFor="search" className="hidden">Search by zip code, city or address</label>
          <input 
          id="search"
          autoComplete="off"
          className="w-full p-2 pr-6 rounded border border-gray-400 focus:ring focus:ring-green-600 focus:outline-none focus:border-transparent"
          onChange={onChangeHandler}
          value={searchInputText}
          type="text"
          placeholder="zip code, city or address"/>
          <img 
          src={searchButton}
          alt="search button"
          className="relative -ml-6"/>
        </div>
        {showSuggest &&
          <ul className="absolute rounded border border-2 border-green-200 w-11/12 md:max-w-screen-md mt-0.5 empty:hidden">
            {suggest}
          </ul>
        }
      </form>
    </div>
  );
};

export default Search;