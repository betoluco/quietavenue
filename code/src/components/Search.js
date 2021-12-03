import React, {useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"; 

import searchButton from "../images/searchButtonIcon.svg";
import SuggestType from "./stateless/SuggestType";
import Suggestion from "./stateless/Suggestion";

const Search = props =>{
  const history = useHistory();
  const [searchInputText, setSearchInputText] = useState("");
  const [suggest, setSuggest] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      if (searchInputText.length > 1 && searchInputText.length < 200){ //avoid attacks by input overload
        const response = await axios("https://quietavenue.com/api/search?search=" + searchInputText );
        
        const propertySuggest = response.data.propertySuggest;
        const citySuggest = response.data.citySuggest;
        const zipCodeSuggest = response.data.zipCodeSuggest;
        let suggestList = [];
        
        if(propertySuggest.length){
          suggestList.push(<SuggestType type="Property" />);
          propertySuggest.forEach(property =>{
            suggestList.push(
              <Suggestion 
              onMouseDownHandler={onMouseDownHandler}
              link={property.PK}
              name={property.address} />
            );
          });
        }
        
        if(citySuggest.length){
          suggestList.push(<SuggestType type="City" />);
          citySuggest.forEach(city =>{
            suggestList.push(
              <Suggestion 
              onMouseDownHandler={onMouseDownHandler}
              link={city.cityId}
              name={city.city} />
            );
          });
        }
        
        if(zipCodeSuggest.length){
          suggestList.push(<SuggestType type="Zip code" />);
          zipCodeSuggest.forEach( zipCode  =>{
            suggestList.push(
              <Suggestion 
              onMouseDownHandler={onMouseDownHandler}
              link={zipCode.zipCodeId}
              name={zipCode.zipCode} />
            );
          });
        }
        
        if(!propertySuggest.length && !citySuggest.length && !zipCodeSuggest.length){
          suggestList.push(<SuggestType type="No results" />);
        }
        
        setSuggest(suggestList);
      }else{
        setSuggest([]);
      }
    };
    getData();
  }, [searchInputText]);
  
  const onChangeHandler = event =>{
    setSearchInputText(event.target.value);
  };
  
  const onBlurHandler = event =>{
    setSuggest([]);
    setSearchInputText("");
  };
  
  const onMouseDownHandler = link =>{
    history.push(link);
  };
  
  return (
    <div className="flex flex-col items-center w-full">
      <form className="flex content-center w-11/12 md:max-w-screen-md mb-10">
        <input 
        className="w-full p-2 pr-6 rounded border border-gray-400 focus:ring focus:ring-green-600 focus:outline-none focus:border-transparent"
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        value={searchInputText}
        type="text"
        placeholder="zip code, city, or address"/>
        <img 
        src={searchButton}
        alt="search button"
        className="relative -ml-6"/>
      </form>
      <div className="absolute mt-10 w-11/12  md:max-w-screen-md">
        {suggest}
      </div>
    
    </div>
  );
  
};

export default Search;