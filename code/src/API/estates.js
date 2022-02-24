import AWS from "aws-sdk";

import formatResponse from "./formatResponse";

const estates = async (req, res) =>{
    AWS.config.update({region: 'us-west-1'});
    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    const params = { TableName: "quietavenue.com" };
    
    try {
        const tableItems = await docClient.scan(params).promise();
        const response = await Promise.all( tableItems.Items.map( async estate => {
            return formatResponse( {id: estate.PK}, estate.estate ); 
        }));
        res.status(200);
        return response;
        
    }catch (error) {
        console.log("Error", error.message);
        res.status(500);
        return;
    }
};

export default estates;