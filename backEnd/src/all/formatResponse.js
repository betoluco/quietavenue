import getAudioData from "./getAudioData";

const formatResults = async (estate) =>{
    const item = {id: estate.estate_id};
   
    item.address1 = estate.address_1;
    item.city = estate.cites_fk;
    item.zipCode = estate.zip_code_fk;
    item.profilePicture  = estate.profile_picture;
    
    if (estate.address_2 !== null) {
        item.address2 = estate.address_2;
    }
    
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
    
    
    if (estate.audio_data_link !== null && estate.sunrise !== null && estate.sunset !== null) {
        await getAudioData(estate.audio_data_link, item, estate);
    }
    
    
    return item;
};

export default formatResults;