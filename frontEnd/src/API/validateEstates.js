const validateEstate = estate =>{
    if (
        estate.estate.hasOwnProperty("address1")&&
        estate.estate.hasOwnProperty("address2")&&
        estate.estate.hasOwnProperty("city")&&
        estate.estate.hasOwnProperty("cityId")&&
        estate.estate.hasOwnProperty("zipCode")&&
        estate.estate.hasOwnProperty("citySuggest")&&
        estate.estate.hasOwnProperty("zipCodeSuggest")&&
        estate.estate.hasOwnProperty("estateSuggest")&&
        estate.estate.hasOwnProperty("profilePicture")
    ) {
        return true;
    }else{
        return false;
    }
};

export default validateEstate;