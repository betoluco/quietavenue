import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SearchInput from "./stateless/SearchInput";
import { fetchSearchInput } from "../redux/asyncActions";
import { inputChanged, fetchSearchInputSucceded } from "../redux/actions";

const Search = props =>{
  const dispatch = useDispatch();
  const searchInput = useSelector( state => state.searchInput );
  const citySuggest = useSelector( state => state.citySuggest );
  const propertySuggest = useSelector( state => state.propertySuggest );
  
  let suggestsList = [];
  
  if(citySuggest.length !== 0 && propertySuggest.length !== 0){
  
    if (searchInput.length > 0){
      suggestsList.push(<li className="" id="city">City</li>);
      
      citySuggest.forEach(city =>{
        suggestsList.push(
          <li className="" id="city" onClick={() => onClickHandler(city.city)}>
            <Link to={"/filter?city=" + city.PK1}>
              <h3>{city.city}</h3>
            </Link>
          </li>
        );
      });
      
      suggestsList.push(<li className="" id="porperty">Property</li>);
      
      propertySuggest.forEach(property =>{
        suggestsList.push(
          <li className="" id="city" onClick={() => onClickHandler(property.address)}>
            <Link to={"/property/" + property.PK}>
              <h3>{property.address}</h3>
            </Link>
          </li>
        );
      });
    }else{
      dispatch(fetchSearchInputSucceded({ //resets results
        citySuggest: [],
        propertySuggest: [] 
      }));
    }
  }
  
  const onChangeHandler = event =>{
    dispatch( fetchSearchInput(event.target.value) );
  };
  
  const onClickHandler = (selectedItem) =>{
    dispatch(inputChanged(selectedItem));
    dispatch(fetchSearchInputSucceded({
      citySuggest: [],
      propertySuggest: [] 
    }));
  };
  
  return <SearchInput
    userInput={searchInput}
    onChangeHandler={onChangeHandler}
    suggest={suggestsList}
  />;
  
};

export default Search;