import React, {useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import searchButton from "./images/magnifyingGlassOp.svg";

const Search = props =>{
  
  const [searchInputText, setSearchInputText] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  
  useEffect( () => {
    //The search in the database is done using trigrams that's why it need 3 chars
    if (searchInputText.length > 2) { 
      let didCancel = false;
      
      const filterSearch = async () => {
        const response = await axios.get(`/api/search?filter=${searchInputText}`);
        
        if (!didCancel) { // Ignore if we started fetching something else
          let suggestList = [];
          const estateSuggestions = response.data.addresses;
          const citySuggestions = response.data.cities;
          const zipCodeSuggestions = response.data.zip_codes;
          
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
                key={element.url}
                onClick={onSuggestClick}
                className="flex p-1 pl-3 bg-white text-lg text-stone-800 hover:bg-green-200">
                  <Link to={element.url}>
                    {element.name}
                  </Link>
                </li>
              );
            });
          }
          
          if(citySuggestions.length){
            suggestList.push(
              <li 
              className="p-1 bg-white text-base text-stone-500 w-full"
              key={'city'}>
                City
              </li>
            );
            citySuggestions.forEach( element =>{
              suggestList.push(
                <li
                key={element.url}
                onClick={onSuggestClick}
                className="flex p-1 pl-3 bg-white text-lg text-stone-800 hover:bg-green-200">
                  <Link to={element.url}>
                    {element.name}
                  </Link>
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
                key={element.url}
                onClick={onSuggestClick}
                className="flex p-1 pl-3 bg-white text-lg text-stone-800 hover:bg-green-200">
                  <Link to={element.url}>
                    {element.name}
                  </Link>
                </li>
              );
            });
          }
            
          if(suggestList.length === 0){
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
        }
      };
      
      filterSearch();
      return () => { didCancel = true; }; // Remember if we start fetching something else
      
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
            aria-label="search-input"
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
            className="relative w-5 -ml-7"/>
          </div>
        </div>
        {showSuggest &&
          <ul
          className="absolute w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 rounded-md 
          border border border-green-600 overflow-hidden z-20">
            {suggest}
          </ul>
        }
      </form>
    </div>
  );
};

export default Search;