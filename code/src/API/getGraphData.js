import AWS from "aws-sdk";

const getGraphData = async (graphDataLink) =>{
    AWS.config.update({region: 'us-west-1'});
    let s3 = new AWS.S3({apiVersion: '2006-03-01'});
    var s3params = {
        Bucket: "quietavenue.com", 
        Key: graphDataLink, 
    };
    console.log("getGraphData");
    const response = await s3.getObject(s3params).promise();
    console.log("response", response)
    return JSON.parse(response.Body.toString('utf-8'));
};

export default getGraphData;