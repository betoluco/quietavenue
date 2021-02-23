import AWS from "aws-sdk";

const fetchProperties = async (req, res) =>{
    const ALL = "ALL_PROPERTIES";
    
    const resultsParser = properties =>{
        const propertiesArray = properties.Items.map( item => {
            return {
                id: item.PK,
                city: item.property.city,
                state: item.property.state,
                number: item.property.number,
                street: item.property.street,
                zip_code: item.property.zip_code,
                profile_picture: item.property.profile_picture
            };
        });
        return propertiesArray;
    };
    
    const city = req.query.city || ALL;
    AWS.config.update({region: 'us-west-1'});
    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    
    try {
        if (city === ALL) {
            const params = {TableName: "quietavenue"};
            const propertiesPromise = docClient.scan(params).promise();
            const propertiesArray = await propertiesPromise;
            return( resultsParser(propertiesArray) );
        }else{
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
                return( resultsParser(propertiesArray) );
            }else{
                res.status(404);
                return;
            }
        }
    }catch (error) {
            console.log("Error", error.message);
            res.status(500);
            return;
        }
};

export default fetchProperties;