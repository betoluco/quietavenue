import AWS from "aws-sdk";

import formatResponse from "./formatResponse";

const estate = async (req, res) =>{
    const estateId = req.params.estateId;
    AWS.config.update({region: 'us-west-1'});
    
    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    const dinamoDBparams = {
        TableName: "quietavenue.com",
        Key: {"PK": estateId}
    };
    
    try {
        const dynamoDBresponse = await docClient.get(dinamoDBparams).promise();
        if (dynamoDBresponse.hasOwnProperty("Item")){
            const estateData =  dynamoDBresponse.Item.estate;
            return await formatResponse( { id: dynamoDBresponse.Item.PK }, estateData );
            
        }else{
            res.status(404);
            return;
        }
    
    }catch (error) {
        console.log("Error", error.message);
        res.status(500);
        return;
    }
};

export default estate;