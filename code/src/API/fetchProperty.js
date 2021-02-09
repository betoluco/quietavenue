import AWS from "aws-sdk";
import path from "path"

const fetchProperty = async (req, res) =>{
    const id = path.basename(req.path);
    AWS.config.update({region: 'us-west-1'});

    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    const params = {
        TableName: "quietavenue",
        Key: {"PK": id}
    };
    
    const propertyPromise = docClient.get(params).promise();
    
    try {
        const property = await propertyPromise;
        if (property.hasOwnProperty("Item")){
            return {
                id: property.Item.PK,
                city: property.Item.Data.city,
                state: property.Item.Data.state,
                number: property.Item.Data.number,
                street: property.Item.Data.street,
                zip_code: property.Item.Data.zip_code,
                profile_picture: property.Item.Data.profile_picture,
                video_link: property.Item.Data.video_link,
                graph_data: property.Item.Data.graph_data
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