import React, {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"; 

import SearchInput from "./stateless/SearchInput";

const Search = props =>{
  const history = useHistory();
  const [searchInputText, setSearchInputText] = useState("");
  const [suggests, setSuggest] = useState([]);
  const [focus, setFocus] = useState(false);
  
  useEffect(async () => {
    const suggestsList = [];
    
    if (searchInputText.length > 1 && searchInputText.length < 200 && focus){ //avoid attacks by input overload
      const response = await axios(
        "https://quietavenue.com/api/search?search=" + searchInputText 
      );
      const propertySuggest = response.data.propertySuggest;
      const citySuggest = response.data.citySuggest;
      const zipCodeSuggest = response.data.zipCodeSuggest;
      
      suggestsList.push(
        <li className="text-sm mx-2 border-b-2 border-green-600" 
        key="porperty">
          Property
        </li>
      );
      if(propertySuggest.length){
        propertySuggest.forEach(property =>{
          suggestsList.push(
            <li
            onMouseDown={() => onMouseDownHandler(property.PK)}
            className="text-lg m-1 ml-2 mb-3 hover:bg-green-200" 
            key={property.PK}>
              <h3>{property.address}</h3>
            </li>
          );
        });
      }else{
        suggestsList.push(<li className="m-5" key="noProperty"></li>);
      }
      
      suggestsList.push(
        <li className="text-sm mx-2 border-b-2 border-green-600" 
        key="city">
          City
        </li>
      );
      if(citySuggest.length){
        citySuggest.forEach(city =>{
          suggestsList.push(
            <li 
            onMouseDown={() => onMouseDownHandler(city.cityId)}
            className="text-lg m-1 ml-2 mb-2 hover:bg-green-200" 
            key={city.cityId}>
              <h3>{city.city}</h3>
            </li>
          );
        });
      }else{
        suggestsList.push(<li className="m-5" key="noCity"></li>);
      }
      
      suggestsList.push(
        <li className="text-sm mx-2 border-b-2 border-green-600" 
        key="zipCode">
          zip code
        </li>
      );
      if(zipCodeSuggest.length){
        zipCodeSuggest.forEach(zipCode =>{
          suggestsList.push(
            <li
            onMouseDown={() => onMouseDownHandler(zipCode.zipCodeId)}
            className="text-lg m-1 ml-2 mb-3 hover:bg-green-200" 
            key={zipCode.zipCodeId}>
              <h3>{zipCode.zipCode}</h3>
            </li>
          );
        });
      }else{
        suggestsList.push(<li className="m-5" key="noZipCode"></li>);
      }
    }
    setSuggest(suggestsList);
  }, [searchInputText]);
  
  const onChangeHandler = event =>{
    setSearchInputText(event.target.value);
  };
  
  const onFocusHandler = event =>{
    setFocus(true);
  };
  
  const onBlurHandler = event =>{
    setFocus(false);
    setSearchInputText("");
  };
  
  const onMouseDownHandler = link =>{
    history.push(link);
  };
  
  return <SearchInput
    userInput={searchInputText}
    onChangeHandler={onChangeHandler}
    onFocusHandler={onFocusHandler}
    onBlurHandler={onBlurHandler}
    suggests={suggests}
  />;
  
};

export default Search;