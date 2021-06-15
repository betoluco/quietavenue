import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import SearchInput from "./stateless/SearchInput";

const Search = props =>{
  const [searchInputText, setSearchInputText] = useState("");
  const suggestsList = [];

  useEffect(async () => {
    if (searchInputText.length > 1 && searchInputText.length < 100){ //avoid attacks by input overload
      const response = await axios(
        "https://quietavenue.com/api/search?search=" + searchInputText 
      );
      const citySuggest = response.data.suggests.citySuggest;
      const propertySuggest = response.data.suggests.propertySuggest;
    
      suggestsList.push(<li className="" id="city">City</li>);
      
      if(citySuggest.length !== 0){
        citySuggest.forEach(city =>{
          suggestsList.push(
            <li className="" id="city">
              <Link to={"/filter?city=" + city.PK1}>
                <h3>{city.city}</h3>
              </Link>
            </li>
          );
        });
      }else{
        suggestsList.push(<li className="" id="noCitySuggest">No sugesstions</li>);
      }
        
      suggestsList.push(<li className="" id="porperty">Property</li>);
      
      if(propertySuggest.length !== 0){
        propertySuggest.forEach(property =>{
          suggestsList.push(
            <li className="" id="city">
              <Link to={"/property/" + property.PK}>
                <h3>{property.address}</h3>
              </Link>
            </li>
          );
        });
      }else{
        suggestsList.push(<li className="" id="city">No sugesstions</li>);
      }
    }  
  }, []);
  
  const onChangeHandler = event =>{
    setSearchInputText(event.target.value);
  };
  
  return <SearchInput
    userInput={searchInputText}
    onChangeHandler={onChangeHandler}
    suggest={suggestsList}
  />;
  
};

export default Search;