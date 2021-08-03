import AWS from "aws-sdk";

const getGraphData = async (graphDataLink) =>{
    AWS.config.update({region: 'us-west-1'});
    let s3 = new AWS.S3({apiVersion: '2006-03-01'});
    var s3params = {
        Bucket: "quietavenue.com", 
        Key: graphDataLink, 
    };
    const response = await s3.getObject(s3params).promise();
    return JSON.parse(response.Body.toString('utf-8'));
};

export default getGraphData;