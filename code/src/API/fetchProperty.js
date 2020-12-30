import AWS from "aws-sdk";

const fetchProperty = async (req, res) =>{
    const id = decodeURI(req.path.split("/").pop());
    AWS.config.update({region: 'us-west-1'});

    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    const params = {
        TableName: "properties",
        Key: {"id": id}
    };
    
    const fetchedProperty = docClient.get(params).promise();
    
    try {
        const property = await fetchedProperty;
        if (property.hasOwnProperty("Item")){
            return {
                id: property.Item.id,
                number: property.Item.address.number,
                city: property.Item.address.city,
                street: property.Item.address.street,
                state: property.Item.address.state,
                zip_code: property.Item.address.zip_code,
                profile_picture: property.Item.profile_picture,
                video_link:property.Item.video_link
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