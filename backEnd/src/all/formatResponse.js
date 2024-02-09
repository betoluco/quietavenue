import getAudioData from "./getAudioData";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";

const formatResults = async (estate) =>{
    const url = `/estate/${estate.estate_id}/${estate.state_abbreviation}/
                ${estate.city}/${estate.address_1}`.replace(/\s+/g, '-');
    
    const item = {estateId: estate.estate_id};
    item.url = url
    item.address1 = estate.address_1;
    
    try {
        const client = new S3Client({ region: 'us-west-1' });
        const s3params = {
            Bucket: `${process.env.S3_BUCKET}`, 
            Key: estate.profile_picture
        };
        const command = new HeadObjectCommand(s3params);
        const response = await client.send(command);
        //if (response['$metadata'].httpStatusCode === 200) {
        if (Array.from(estate.profile_picture)[0] != '/' ){
            item.profilePicture = '/' + estate.profile_picture;
        }
    } catch (error){
        item.profilePicture = '/assets/house-svg-icon.svg';
    }
    
    item.city = estate.city;
    item.cityId = estate.city_id;
    item.state = estate.state_abbreviation;
    item.zipCode = estate.zip_code;
    item.zipCodeId = estate.zip_code_id;
    
    item.address2 = item.city + ' ' + item.state + ' ' + item.zip_code;
    
    if (estate.audio_description !== null) {
        item.audioDescription = estate.audio_description;
    }
    
    if (estate.bathroom !== null) {
        item.bathroom = estate.bathroom;
    }
    
    if (estate.bedroom !== null) {
        item.bedroom = estate.bedroom;
    }
    
    if (estate.lot_area !== null) {
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