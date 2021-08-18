import { domainName } from "./urls";
import getGraphData from "./getGraphData";

const formatResults = async (estate, data) =>{
    estate.address1 = data.address1 || "NO STREET";
    estate.address2 = data.address2 || "NO CITY";
    estate.city = data.city || "NO CITY";
    estate.cityId = data.cityId || "NO-CITY";
    estate.zipCode = data.zipCode || "NO-ZIPCODE";
    
    if (data.hasOwnProperty("audioDescription")) {
        estate.audioDescription = data.audioDescription;
    }
    
    if (data.hasOwnProperty("bathroom")) {
        estate.bathroom = data.bathroom;
    }
    
    if (data.hasOwnProperty("bedroom")) {
        estate.bedroom = data.bedroom;
    }
    
    if (data.hasOwnProperty("lotArea")) {
        estate.lotArea = data.lotArea;
    }
    
    if (data.hasOwnProperty("soundScore")) {
        estate.soundScore = data.soundScore;
    }
    
    if (data.hasOwnProperty("profilePicture")) {
        const profilePicture = data.profilePicture || "assets/NoPicture.jpg";
        estate.profilePicture = new URL(profilePicture, domainName);
    }
    
    if (data.hasOwnProperty("videoLink")) {
        estate.videoLink = data.videoLink;
    }
    
    if (data.hasOwnProperty("graphDataLink")) {
        estate.graphData = await getGraphData(data.graphDataLink);
    }
    
    return estate;
};

export default formatResults;