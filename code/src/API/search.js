const axios = require("axios");

const host = "https://vpc-quietavenue-25aox5ugu2rpwy26vrkozq2zk4.us-west-1.es.amazonaws.com/";


const search = async (req, res) =>{
    const propertyQuery = {
        "suggest": {
            "propertySuggest" : {
                "prefix" : req.query.search, 
                "completion": { 
                    "field" : "propertySuggest" 
                }
            }
        }
    };
    
    let response = {
        propertySuggest:[
            {
                PK: "no_property",
                address: "no resulst"
            }
        ], 
        citySuggest:[
            {
                PK1: "no_city",
                city: "no resulst"
            }
        ]
    };
    
    try {
        const propertySuggestResults = await axios.get( host + "properties/_search",{ 
            params:{
                source: JSON.stringify(propertyQuery),
                source_content_type: "application/json"
            }
        });
        
        const propertySuggest = propertySuggestResults.data.suggest.propertySuggest[0].options;
        if (propertySuggest.length > 0){
            response.propertySuggest = propertySuggest.map((property) => {
                return {
                    PK: property._id,
                    address: property._source.address1 + " " + property._source.address2 
                };
            });
        }
        
        
        const cityQuery = {
            "suggest": {
                "citySuggest" : {
                    "prefix" : req.query.search, 
                    "completion": { 
                        "field" : "citySuggest" 
                    }
                }
            }
        };
        
        const citySuggestResults = await axios.get( host + "city/_search",{ 
            params:{
                source: JSON.stringify(cityQuery),
                source_content_type: "application/json"
            }
        });
        
        
        
        const citySuggest = citySuggestResults.data.suggest.citySuggest[0].options;
            if (citySuggest.length > 0){
                response.citySuggest = citySuggest.map((city) => {
                    
                    return {
                        PK1: city._id,
                        city: city.text
                    };
                });
            }
                    
        
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

module.exports = search;