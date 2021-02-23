import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import express from "express";
import { matchRoutes } from "react-router-config";
import cors from "cors";

import renderer from "./renderer";
import Routes from "./routes";
import createStore from "./redux/createStore";
import fetchProperties from "./API/fetchProperties";
import fetchProperty from "./API/fetchProperty";
import search from "./API/search";

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());

app.get("/favicon.ico", (req, res) =>{
    res.redirect("https://s3-us-west-1.amazonaws.com/quietavenue.com/images/favicon.ico");
});

// API

app.get("/api/city/", cors({origin: "*"}), async (req, res) =>{
    const response = await fetchProperties(req, res);
    res.send(JSON.stringify(response));
});

app.get("/api/property/*", cors({origin: "*"}), async (req, res) =>{
    const response = await fetchProperty(req, res);
    res.send(JSON.stringify(response));
});

app.get("/api/search", cors({origin: "*"}), async (req, res) =>{
    const response = await search(req, res);
    res.send(JSON.stringify(response));
});

//Server side rendering

app.get("*", async (req, res) =>{
    const store = createStore();
    
    const path = req.apiGateway.event.path;

    const promises = matchRoutes(Routes, path).map(({ route }) => {
        if (route.loadData){
            return route.loadData(store, req);
        }else{
            return Promise.resolve(null);
        }
    });
    
    const render = () => {
        const context = {};
        const content = renderer(req.apiGateway.event, store, context);
        
        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    };
    
    try {
        await Promise.all(promises);
        render();
    }catch(err){
        render();
    }
});

export default app;