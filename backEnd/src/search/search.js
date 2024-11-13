import pg from 'pg';

import sslrootcert from '../us-east-1-bundle.pem'; //Get the certificate from https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html

var pool = new pg.Pool({
        host: `${process.env.ENDPOINT}`,
        port: process.env.PORT,
        database: `${process.env.DATABASE_NAME}`,
        user: `${process.env.PROXY_USERNAME}`,
        password: `${process.env.PROXY_PASSWORD}`,
        sslrootcert: sslrootcert,
        sslmode: "verify-full"
});

const search = async (req, res) =>{
    const filterQueryParam = req.query.filter;
    if (filterQueryParam.length > 2) {
        try {
            const addressSearch = await pool.query(`
                SELECT estate_id, address_1, cities.city, 
                states.state_abbreviation, zip_codes.zip_code
                FROM estates 
                INNER JOIN cities
                ON city_fk = city_id
                INNER JOIN states
                    ON state_fk = state_id
                INNER JOIN zip_codes
                    ON zip_code_fk = zip_code_id
                WHERE address_1 ILIKE '%${filterQueryParam}%';
            `);
            const citiesSearch = await pool.query(`
                SELECT city_id, city, states.state_abbreviation
                FROM cities 
                INNER JOIN states
                    ON state_fk = state_id
                WHERE city ILIKE '%${filterQueryParam}%';
            `);
            const zipCodesSearch = await pool.query(`
                SELECT zip_code_id, zip_code
                FROM zip_codes 
                WHERE zip_code ILIKE '%${filterQueryParam}%';
            `);
            
            const response = {};
            response.addresses =  addressSearch.rows.map( estate => {
                const url = `/estate/${estate.estate_id}/${estate.state_abbreviation}/
                ${estate.city}/${estate.address_1}`.replace(/\s+/g, '-');
                const name = `${estate.address_1} ${estate.city} ${estate.state_abbreviation} ${estate.zip_code}`;
                return {
                    'name': name,
                    'url': url
                };
            });
            response.cities =  citiesSearch.rows.map( city => {
                const url = `/city/${city.city_id}/${city.state_abbreviation}/${city.city}`.replace(/\s+/g, '-');
                const name = `${city.city}, ${city.state_abbreviation}`;
                return {
                    'name': name,
                    'url': url
                };
            });
            response.zip_codes =  zipCodesSearch.rows.map( zipCode => {
                const url = `/zipCode/${zipCode.zip_code_id}/${zipCode.zip_code}`.replace(/\s+/g, '-');
                 return {
                    'name': zipCode.zip_code,
                    'url': url
                };
            });
            res.status(200);
            return response;
            
        }catch (error) {
            console.error(error);
            res.status(500);
            return;
        }
    
    }else{
        res.status(200);
        return null;
    }
};

export default search;