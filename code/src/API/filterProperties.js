import AWS from "aws-sdk";

const filterPorperties = async (req, res) =>{
    
    const city = req.query.city;
    AWS.config.update({region: 'us-west-1'});
    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    
    try {
        const params = {
            TableName: "quietavenue",
            IndexName: "PK1-index",
            KeyConditionExpression: "PK1 = :city",
            ExpressionAttributeValues: {
                ":city": city
            }
        };
            
        const propertiesPromise = docClient.query(params).promise();
        const propertiesArray = await propertiesPromise;
        
        if (propertiesArray.Items.length > 0){
            const properties = propertiesArray.Items.map( item => {
                return {
                    PK: item.PK,
                    address1: item.property.address1,
                    address2: item.property.address2,
                    profilePicture: item.property.profilePicture
                };
            });
            return properties;
            
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

export default filterPorperties;