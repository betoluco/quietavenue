import axios from "axios";

import {domainName, elasticSearch} from "./urls";

const search = async (req, res) =>{
    let response = {
        propertySuggest:[], 
        citySuggest:[],
        zipCodeSuggest:[]
    };
    
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
    
    const cityQuery = {
        "suggest": {
            "citySuggest" : {
                "prefix" : req.query.search, 
                "completion": { 
                    "field" : "citySuggest",
                    "skip_duplicates": true
                }
            }
        }
    };
    
    const zipCodeQuery = {
        "suggest": {
            "zipCodeSuggest" : {
                "prefix" : req.query.search, 
                "completion": { 
                    "field" : "zipCodeSuggest",
                    "skip_duplicates": true
                }
            }
        }
    };
    
    try {
        const propertySuggestResults = await axios.get( elasticSearch + "estate/_search",{ 
            params:{
                source: JSON.stringify(propertyQuery),
                source_content_type: "application/json"
            }
        });
        
        const propertySuggest = propertySuggestResults.data.suggest.propertySuggest[0].options;
        response.propertySuggest = propertySuggest.map((property) => {
            return {
                PK: new URL("property/" + property._id, domainName),
                address: property._source.address1 + " " + property._source.address2 
            };
        });
        
        
        const citySuggestResults = await axios.get( elasticSearch + "estate/_search",{ 
            params:{
                source: JSON.stringify(cityQuery),
                source_content_type: "application/json"
            }
        });
        
        const citySuggest = citySuggestResults.data.suggest.citySuggest[0].options;
        response.citySuggest = citySuggest.map((city) => {
            return {
                cityId: new URL("filter/" + city._source.cityId, domainName),
                city: city._source.city
            };
        });
            
        const zipCodeSuggestResults = await axios.get( elasticSearch + "estate/_search",{ 
            params:{
                source: JSON.stringify(zipCodeQuery),
                source_content_type: "application/json"
            }
        });
        
        const zipCodeSuggest = zipCodeSuggestResults.data.suggest.zipCodeSuggest[0].options;
        response.zipCodeSuggest = zipCodeSuggest.map((zipCode) => {
            return{
                zipCodeId: new URL("filter/" + zipCode._source.zipCode, domainName),
                zipCode: zipCode._source.zipCode
            }
        });
        
        res.status(200)
        return response;
    
    }catch (error) {
        console.log(error);
        res.status(500);
        return;
    }
};

export default search;