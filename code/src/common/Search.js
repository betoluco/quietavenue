import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";

import searchButton from "./images/magnifyingGlassOp.svg";
import { estateSuggest } from "../trie";
import { citySuggest } from "../trie";
import { zipCodeSuggest } from "../trie";

const Search = props =>{
  
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
          key={'estates'} data-cy="estateTitle">
            Estates
          </li>
        );
        estateSuggestions.forEach( element =>{
          suggestList.push(
            <Link 
            to={element.link}
            key={element.link}
            onClick={onSuggestClick}
            className="flex p-1 pl-3 bg-white text-lg text-stone-800 hover:bg-green-200">
              {element.name}
            </Link>
          );
        });
      }
      
      if(citySuggestions.length){
        suggestList.push(
          <li 
          className="p-1 bg-white text-base text-stone-500 w-full"
          key={'city'} data-cy="cityTitle">
            City
          </li>
        );
        citySuggestions.forEach( element =>{
          suggestList.push(
            <Link
            to={element.link}
            key={element.link}
            onClick={onSuggestClick}
            className="flex p-1 pl-3 bg-white text-lg text-stone-800 hover:bg-green-200">
              {element.name}
            </Link>
          );
        });
      }
      
      if(zipCodeSuggestions.length){
        suggestList.push(
          <li 
          className="p-1 bg-white text-base text-stone-500 w-full"
          key={'zipCode'} data-cy="zipCodeTitle">
            Zip code
          </li>
        );
        zipCodeSuggestions.forEach( element =>{
          suggestList.push(
            <Link
            to={element.link}
            key={element.link}
            onClick={onSuggestClick}
            className="flex p-1 pl-3 bg-white text-lg text-stone-800 hover:bg-green-200">
              {element.name}
            </Link>
          );
        });
      }
        
      if(suggestList.length === 0){
        suggestList.push(
          <li 
          className="flex p-1 bg-white text-sm border-b-2 border-green-600 border-opacity-50"
          key="No results" data-cy="noResults">
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
  
  const onSuggestClick = link =>{
    setSearchInputText("");
  };
  
  const onFormFocus = event => {
    if(searchInputText.length > 0){
      setShowSuggest(true);
    }
  };
  
  const onFormBlur = event =>{
    if(!event.currentTarget.contains(event.relatedTarget)){
      setShowSuggest(false);
    }
  };
  
  return (
    <div className="flex justify-center w-full mb-10">
      <form 
      onFocus={onFormFocus}
      onBlur={onFormBlur}
      className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <div className="flex flex-col">
          <div className="flex">
            <input 
            id="search"
            autoComplete="off"
            className="w-full p-3 pr-7 rounded-md placeholder-stone-400 focus:ring 
            focus:ring-green-600 ring-inset focus:outline-none border border-stone-400"
            onChange={onChangeHandler}
            value={searchInputText}
            type="text"
            placeholder="zip code, city or address"
            data-cy="inputField"/>
            <img 
            src={searchButton}
            alt="search button"
            className="relative w-5 -ml-7"/>
          </div>
        </div>
        {showSuggest &&
          <ul
          className="absolute w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 rounded-md 
          border border border-green-600 overflow-hidden" data-cy="resultsList">
            {suggest}
          </ul>
        }
      </form>
    </div>
  );
};

export default Search;