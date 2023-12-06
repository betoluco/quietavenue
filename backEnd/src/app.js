import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import express from "express";
import cors from "cors";

import estates from "./all/estates";

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());

// API

const corsDev = `${process.env.CORS}`; //Allow request from Cloud 9 development machine

app.get("/api/estates", cors({origin: corsDev}), async (req, res) =>{
    const response = await estates(req, res);
    res.contentType('application/json');
    res.send(JSON.stringify(response));
});

export default app;