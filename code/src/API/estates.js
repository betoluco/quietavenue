import axios from "axios";
import path from "path";

import { elasticSearch} from "./urls";
import formatResponse from "./formatResponse";

const estates = async (req, res) =>{
    const property = req.params.property;
    const groupId = req.params.groupId;
    let query = {query: {}};
    
    if (property === "match_all") query.query.match_all = {};
    else {
        query.query.term = {};
        query.query.term.[property] = groupId;
    }
    
    try {
        const results = await axios.get( elasticSearch, { 
            params:{
                source: JSON.stringify(query),
                source_content_type: "application/json"
            }
        });
        
        const estates = results.data.hits.hits;
        if (estates.length > 0){
            res.status(200);
            const response = await Promise.all( estates.map( async (estate)  => {
                const estateData = estate._source;
                return formatResponse( {id: estate._id}, estateData )
            }));
            return response
        }
    
        res.status(404);
        return;
    
    }catch (error) {
        console.log(error);
        res.status(500);
        return;
    }
};

export default estates;