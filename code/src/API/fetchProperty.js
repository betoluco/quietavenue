import AWS from "aws-sdk";
import path from "path"

const fetchProperty = async (req, res) =>{
    const PK = path.basename(req.path);
    AWS.config.update({region: 'us-west-1'});

    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    const params = {
        TableName: "quietavenue",
        Key: {"PK": PK}
    };
    
    const propertyPromise = docClient.get(params).promise();
    
    try {
        const property = await propertyPromise;
        if (property.hasOwnProperty("Item")){
            return {
                PK: property.Item.PK,
                address1: property.Item.property.address1,
                address2: property.Item.property.address2,
                profilePicture: property.Item.property.profilePicture,
                videoLink: property.Item.property.videoLink,
                graphDataLink: property.Item.property.graphDataLink
            };
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

export default fetchProperty;