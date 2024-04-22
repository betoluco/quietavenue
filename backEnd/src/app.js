import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import express from "express";
import cors from "cors";

import estates from "./all/estates";
import search from "./search/search";

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());

if(process.env.NODE_ENV == 'development'){
    app.use(cors());
}

app.get("/api/estates", async (req, res) =>{
    const response = await estates(req, res);
    res.contentType('application/json');
    res.send(JSON.stringify(response));
});

app.get("/api/search", async (req, res) =>{
    const response = await search(req, res);
    res.contentType('application/json');
    res.send(JSON.stringify(response));
});

export default app;