import getAudioData from "./getAudioData";

const formatResults = async (estate) =>{
    const item = {url: estate.estate_url};
   
    item.address1 = estate.address_1;
    if (Array.from(estate.profile_picture)[0] != '/' ){
        estate.profile_picture = '/' + estate.profile_picture
    }
    item.profilePicture  = estate.profile_picture;
    item.city = estate.city;
    item.state = estate.state_abbreviation;
    item.zip_code = estate.zip_code;
    
    if (estate.audio_description !== null) {
        item.audioDescription = estate.audio_description;
    }
    
    if (estate.bathroom !== null) {
        item.bathroom = estate.bathroom;
    }
    
    if (estate.bedroom !== null) {
        item.bedroom = estate.bedroom;
    }
    
    if (estate.lotArea !== null) {
        item.lotArea = estate.lot_area;
    }
    
    if (estate.sound_score !== null) {
        item.soundScore = estate.sound_score;
    }
    
    if (estate.price !== null) {
        item.price = estate.price;
    }
    
    if (estate.video_link !== null) {
        item.videoLink = estate.video_link;
    }
    
    if (estate.audio_data_link !== null) {
        await getAudioData(estate.audio_data_link, item, estate);
    }
    
    return item;
};

export default formatResults;