import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchInput from "./stateless/SearchInput";

const Search = props =>{
  const [userInput, setUserInput] = useState("");
  const [streetSuggest, setStreetSuggest] = useState([]);
  const [citySuggest, setCitySuggest] = useState([]);
  
  useEffect(() => {
    async function fetchData(){
      try{
        const response = await axios.get(
          "https://a7etb0iz5f.execute-api.us-west-1.amazonaws.com/Prod/api/search?search=" +
          userInput
        );
        
        setCitySuggest(response.data.city_suggest);
        setStreetSuggest(response.data.street_suggest);
        
      }catch(error) {console.log(error)}
    }
    
    fetchData();
  }, [userInput]);

  const onChangeHandler = event =>{
    setUserInput(event.target.value);
  };
  
  const onClickHandler = (selectedItem) =>{
    setUserInput(selectedItem);
  };
  
  return <SearchInput
    userInput={userInput}
    onChangeHandler={onChangeHandler}
    onClickHandler={onClickHandler}
    propertySuggest={streetSuggest}
    citySuggest={citySuggest}/>;
};

export default Search;