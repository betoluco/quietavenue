import axios from "axios";

import { domainName, elasticSearch} from "./urls";

const search = async (req, res) =>{
    let response = {
        propertySuggest:[], 
        citySuggest:[],
        zipCodeSuggest:[]
    };
    
    const suggesters ={
        "suggest": {
            "propertySuggest" : {
                "prefix" : req.query.search, 
                "completion": { 
                    "field" : "propertySuggest" 
                }
            },
            "citySuggest" : {
                "prefix" : req.query.search, 
                "completion": { 
                    "field" : "citySuggest",
                    "skip_duplicates": true
                }
            },
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
        const results = await axios.get( elasticSearch, { 
            params:{
                source: JSON.stringify(suggesters),
                source_content_type: "application/json"
            }
        });
        
        const propertyURL = new URL("property", domainName);
        const propertySuggest = results.data.suggest.propertySuggest[0].options;
        response.propertySuggest = propertySuggest.map((property) => {
            return {
                PK: new URL(property._id, propertyURL),
                address: property._source.address1 + " " + property._source.address2 
            };
        });
        
        const cityURL = new URL("city", domainName);
        const citySuggest = results.data.suggest.citySuggest[0].options;
        response.citySuggest = citySuggest.map((city) => {
            return {
                cityId: new URL(city._source.cityId, cityURL),
                city: city._source.city
            };
        });
        
        const zipCodeURL = new URL("zipCode", domainName);
        const zipCodeSuggest = results.data.suggest.zipCodeSuggest[0].options;
        response.zipCodeSuggest = zipCodeSuggest.map((zipCode) => {
            return{
                zipCodeId: new URL(zipCode._source.zipCode, zipCodeURL),
                zipCode: zipCode._source.zipCode
            };
        });
            
        res.status(200);
        return response;
    
    }catch (error) {
        console.log(error);
        res.status(500);
        return;
    }
};

export default search;