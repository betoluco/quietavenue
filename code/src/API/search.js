import axios from "axios";

import { elasticSearch } from "./urls";

const search = async (req, res) =>{
    if(req.query.search.length < 200) {
        let response = [
            {
                filter: "Properties",
                elements: []
            },
            {
                filter: "City",
                elements: []
            },
            {
                filter: "Zip Code",
                elements: []
            }
           
        ];
        
        const suggesters ={
            "suggest": {
                "propertySuggest" : {
                    "prefix" : req.query.search, 
                    "completion": { 
                        "field" : "estateSuggest" 
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
            
            const propertySuggest = results.data.suggest.propertySuggest[0].options;
            response[0].elements = propertySuggest.map((property) => {
                return {
                    link: "/estate/" + property._id,
                    name: property._source.address1 + " " + property._source.address2 
                };
            });
            
            const citySuggest = results.data.suggest.citySuggest[0].options;
            response[1].elements = citySuggest.map((city) => {
                return {
                    link: "?filter=cityId&filterId=" + city._source.cityId,
                    name: city._source.city
                };
            });
            
            const zipCodeSuggest = results.data.suggest.zipCodeSuggest[0].options;
            response[2].elements = zipCodeSuggest.map((zipCode) => {
                return{
                    link: "?filter=zipCodeId&filterId=" + zipCode._source.zipCode,
                    name: zipCode._source.zipCode
                };
            });
                
            res.status(200);
            return response;
        
        }catch (error) {
            console.log(error);
            res.status(500);
            return;
        }
    }
    res.status(500);
    return; 
};

export default search;