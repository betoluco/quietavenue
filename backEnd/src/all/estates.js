import pg from 'pg';

import formatResponse from "./formatResponse";

var pool = new pg.Pool({
        host: `${process.env.ENDPOINT}`,
        port: process.env.PORT,
        database: `${process.env.DATABASE_NAME}`,
        user: `${process.env.PROXY_USERNAME}`,
        password: `${process.env.PROXY_PASSWORD}`
});

const estates = async (req, res) =>{
    try {
        const databaseResponse = await pool.query(`
            SELECT address_1, audio_data_link, audio_description, bathroom, 
            bedroom, lot_area, price, profile_picture, video_link,
            cities.city, cities.city_id, states.state_abbreviation,
            zip_codes.zip_code, zip_codes.zip_code_id
            FROM estates
            INNER JOIN cities
                ON city_fk = city_id
            INNER JOIN states
                ON state_fk = state_id
            INNER JOIN zip_codes
                ON zip_code_fk = zip_code_id;
        `);
        const response = await Promise.all( 
            databaseResponse.rows.map( async estate => {
                return formatResponse(estate);
            })
        );
        res.status(200);
        return response;
        
    }catch (error) {
        console.error(error);
        res.status(500);
        return;
    }
};

export default estates;