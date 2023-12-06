import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const getAudioData = async (audioDataLink, item, estate) =>{
    const streamToString = (stream) =>
        new Promise((resolve, reject) =>{
            const chunks = [];
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("error", reject);
            stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        });
        
    const client = new S3Client({ region: 'us-west-1' });
    const s3params = {
        Bucket: `${process.env.S3_BUCKET}`, 
        Key: audioDataLink 
    };
    const command = new GetObjectCommand(s3params);
    
    try {
        const { Body } = await client.send(command);
        item.sunrise = estate.sunrise;
        item.sunset = estate.sunset;
        item.audioData = JSON.parse(await streamToString(Body));
        
    } catch (error) {
        console.log(error);
    }
    return;
};

export default getAudioData;