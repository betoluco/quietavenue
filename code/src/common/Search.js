import React, {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import searchButton from "./images/magnifyingGlassOp.svg";
import { estateSuggest } from "../trie";
import { citySuggest } from "../trie";
import {zipCodeSuggest } from "../trie";

const Search = props =>{
  let history = useHistory();
  
  const [searchInputText, setSearchInputText] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  
  useEffect(() => {
    if (searchInputText.length > 0) {
      let suggestList = [];
      const estateSuggestions = estateSuggest.find(searchInputText);
      const citySuggestions = citySuggest.find(searchInputText);
      const zipCodeSuggestions = zipCodeSuggest.find(searchInputText);
      
      if(estateSuggestions.length){
        suggestList.push(
          <li 
          className="p-1 bg-white text-base text-stone-500 w-full"
          key={'estates'}>
            Estates
          </li>
        );
        estateSuggestions.forEach( element =>{
          suggestList.push(
            <li 
            key={element.link}
            onMouseDown={ () => onMouseDown(element.link)}
            className="flex p-1 pl-3 bg-white text-lg text-stone-800 hover:bg-green-200">
              {element.name}
            </li>
          );
        });
      }
      
      if(citySuggestions.length){
        suggestList.push(
          <li 
          className="p-1 bg-white text-base text-stone-500 w-full"
          key={'city'}>
            city
          </li>
        );
        citySuggestions.forEach( element =>{
          suggestList.push(
            <li 
            key={element.link}
            onMouseDown={ () => onMouseDown(element.link)}
            className="flex p-1 pl-3 bg-white text-lg text-stone-800 hover:bg-green-200">
              {element.name}
            </li>
          );
        });
      }
      
      if(zipCodeSuggestions.length){
        suggestList.push(
          <li 
          className="p-1 bg-white text-base text-stone-500 w-full"
          key={'zipCode'}>
            Zip code
          </li>
        );
        zipCodeSuggestions.forEach( element =>{
          suggestList.push(
            <li 
            key={element.link}
            onMouseDown={ () => onMouseDown(element.link)}
            className="flex p-1 pl-3 bg-white text-lg text-stone-800 hover:bg-green-200">
              {element.name}
            </li>
          );
        });
      }
        
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
    
    }else{
      setSuggest([]);
      setShowSuggest(false);
    }
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
    className="flex justify-center w-full">
      <form className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12"
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}>
        <div className="flex">
          <label htmlFor="search" className="hidden">Search by zip code, city or address</label>
          <input 
          id="search"
          autoComplete="off"
          className="w-full p-3 pr-7 rounded-md placeholder-stone-400 focus:ring 
          focus:ring-green-600 ring-inset focus:outline-none border border-stone-400"
          onChange={onChangeHandler}
          value={searchInputText}
          type="text"
          placeholder="zip code, city or address"/>
          <img 
          src={searchButton}
          alt="search button"
          className="relative -ml-7"/>
        </div>
        {showSuggest &&
          <ul className="absolute w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 rounded-md 
          border border border-green-600 overflow-hidden ">
            {suggest}
          </ul>
        }
      </form>
    </div>
  );
};

export default Search;