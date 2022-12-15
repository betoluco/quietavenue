import getAudioData from "./getAudioData";

const formatResults = async (estate) =>{
    const item = {id: estate.PK};
    const data = estate.estate;
   
    item.address1 = data.address1;
    item.address2 = data.address2;
    item.city = data.city;
    item.cityId = data.cityId;
    item.zipCode = data.zipCode;
    item.citySuggest = data.citySuggest;
    item.zipCodeSuggest = data.zipCodeSuggest;
    item.estateSuggest = data.estateSuggest;
    
    const profilePicture = data.profilePicture;
    item.profilePicture = new URL(profilePicture, `${process.env.REACT_APP_DOMAIN}`);
    
    if (data.hasOwnProperty("audioDescription")) {
        item.audioDescription = data.audioDescription;
    }
    
    if (data.hasOwnProperty("bathroom")) {
        item.bathroom = data.bathroom;
    }
    
    if (data.hasOwnProperty("bedroom")) {
        item.bedroom = data.bedroom;
    }
    
    if (data.hasOwnProperty("lotArea")) {
        item.lotArea = data.lotArea;
    }
    
    if (data.hasOwnProperty("soundScore")) {
        item.soundScore = data.soundScore;
    }
    
    if (data.hasOwnProperty("price")) {
        item.price = data.price;
    }
    
    if (data.hasOwnProperty("videoLink")) {
        item.videoLink = data.videoLink;
    }
    
    try{
        if (data.hasOwnProperty("audioDataLink") && data.hasOwnProperty("sunrise") && data.hasOwnProperty("sunset")) {
            item.sunrise = data.sunrise;
            item.sunset = data.sunset;
            item.audioData = await getAudioData(data.audioDataLink);
        }
    }catch (error){
        console.log(error);
    }
    
    if (data.hasOwnProperty("zillowLink")) {
        item.zillowLink = data.zillowLink;
    }
    
    return item;
};

export default formatResults;