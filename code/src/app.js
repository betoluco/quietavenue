import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import express from "express";
import { matchRoutes } from "react-router-config";
import cors from "cors";

import renderer from "./renderer";
import Routes from "./Routes";
import createStore from "./redux/createStore";
import estates from "./API/estates";
import estate from "./API/estate";
import search from "./API/search";

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());

// API

const corsDev = "https://8ef2832e749e4b0e8eb0dafdb5d7df96.vfs.cloud9.us-west-1.amazonaws.com"; //Allow request from Cloud 9 development machine

app.get("/api/estate/:estateId", cors({origin: corsDev}), async (req, res) =>{
    const response = await estate(req, res);
    res.send(JSON.stringify(response));
});

app.get("/api/search", cors({origin: corsDev}), async (req, res) =>{
    const response = await search(req, res);
    res.send(JSON.stringify(response));
});

app.get("/api/query/:property/:groupId", cors({origin: corsDev}), async (req, res) =>{
    const response = await estates(req, res);
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