import axios from "axios";

const host = "vpc-quietavenue-25aox5ugu2rpwy26vrkozq2zk4.us-west-1.es.amazonaws.com";
const index = "properties";
const url = "https://" + host + "/" + index + "/_search";
const query = {"query": {"match_all": {}}};
    
const fetchProperties = async (req, res) =>{
    if (req.hasOwnProperty("query")){
        const query = {
            "query": {
                "wildcard": {
                    "city": {
                    "value": req.query.city
                    }
                }
            }
        };
    }else{
        const query = {
            "query":{
                "match_all": {}
            }
        };
    }
        
    try {
        const results = await axios.get(url,{ 
            params:{
                source: JSON.stringify(query),
                source_content_type: "application/json"
            }
        });
        const response = results.data.hits.hits.map((property) => {
            return {
                id: property._id,
                number: property._source.number,
                city: property._source.city,
                street: property._source.street,
                state: property._source.state,
                zip_code: property._source.zip_code,
                profile_picture: property._source.profile_picture
            };
        });
    return response;
    
    }catch (error) {
        if (error.hasOwnProperty("response")) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.hasOwnProperty("request")) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        res.status(500);
        return;
    }
};

export default fetchProperties;