import AWS from "aws-sdk";

const fetchProperties = async (req, res) =>{
    
    AWS.config.update({region: 'us-west-1'});
    const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    
    try {
        const params = {TableName: "quietavenue"};
        const propertiesPromise = docClient.scan(params).promise();
        const propertiesArray = await propertiesPromise;
        const properties = propertiesArray.Items.map( item => {
            return {
                PK: item.PK,
                address1: item.property.address1,
                address2: item.property.address2,
                profilePicture: item.property.profile_picture
            };
        });
        
        return properties;
        
    }catch (error) {
        console.log("Error", error.message);
        res.status(500);
        return;
    }
};

export default fetchProperties;