const axios = require("axios");

const host = "vpc-quietavenue-25aox5ugu2rpwy26vrkozq2zk4.us-west-1.es.amazonaws.com";
const index = "properties";
const url = "https://" + host + "/" + index + "/_search";

const search = async (req, res) =>{
    const query = {
        "suggest": {
            "street_suggest" : {
                "prefix" : req.query.search, 
                "completion": { 
                    "field" : "street_suggest" 
                }
            },
            "city_suggest" : {
                "prefix" : req.query.search, 
                "completion": { 
                    "field" : "city_suggest" 
                }
            }
        }
    };
    
    let response = { city_suggest: [] };
    try {
        const suggest_results = await axios.get(url,{ 
            params:{
                source: JSON.stringify(query),
                source_content_type: "application/json"
            }
        });
        
        const street_suggest = suggest_results.data.suggest.street_suggest[0].options;
        console.log(street_suggest);
        if (street_suggest.length != 0){
            response.street_suggest = street_suggest.map((property) => {
                console.log(property);
                return {
                    id: property._source.id,
                    address: property._source.number + " " +
                    property._source.street + ", " +
                    property._source.city + ", " +
                    property._source.state + ", " +
                    property._source.zip_code
                };
            });
        }
        
        const city_suggest = suggest_results.data.suggest.city_suggest[0].options;
        console.log(city_suggest);
        if (city_suggest.length != 0){
            for ( let i=0; i<city_suggest.length; i++ ){
                let city = city_suggest[i]._source.address.city;
                if (!response.city_suggest.includes(city)){
                    response.city_suggest.push(city);
                }
            }
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