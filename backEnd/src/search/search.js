import pg from 'pg';

var pool = new pg.Pool({
        host: `${process.env.ENDPOINT}`,
        port: process.env.PORT,
        database: `${process.env.DATABASE_NAME}`,
        user: `${process.env.PROXY_USERNAME}`,
        password: `${process.env.PROXY_PASSWORD}`
});

const search = async (req, res) =>{
    const filterQueryParam = req.query.filter;
    if (filterQueryParam.length > 2) {
        try {
            const addressSearch = await pool.query(`
                SELECT estate_url FROM estates WHERE address_1 ILIKE '%${filterQueryParam}%';
            `);
            const citiesSearch = await pool.query(`
                SELECT city_id FROM cities WHERE city ILIKE '%${filterQueryParam}%';
            `);
            const zipCodesSearch = await pool.query(`
                SELECT zip_code_id FROM zip_codes WHERE zip_code ILIKE '%${filterQueryParam}%';
            `);
            
            const response = {}
            response.addresses =  addressSearch.rows.map( estate => {
                return estate.estate_url;
            });
            response.cities =  citiesSearch.rows.map( cities => {
                return cities.city_id;
            });
            response.zip_codes =  zipCodesSearch.rows.map( zipCodes => {
                return zipCodes.zip_code_id;
            });
            
            res.status(200);
            return response;
            
        }catch (error) {
            console.error(error.message);
            res.status(500);
            return;
        }
    
    }else{
        res.status(200);
        return null;
    }
};

export default search;