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
            SELECT estate_id, address_1, address_2, audio_data_link, audio_description, 
            bathroom, bedroom, lot_area, price, profile_picture, sunrise, sunset,
            video_link FROM estates;
        `);
        const response = await Promise.all( 
            databaseResponse.rows.map( async estate => {
                return formatResponse(estate);
            })
        );
        res.status(200);
        return response;
        
    }catch (error) {
        console.log("Error", error.message);
        res.status(500);
        return;
    }
};

export default estates;