import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import express from "express";
import { matchRoutes } from "react-router-config";
import cors from "cors";
import { configureStore } from '@reduxjs/toolkit';

import renderer from "./renderer";
import Routes from "./Routes";
import estatesReducer from './estatesReducer';

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());
app.get("*", async (req, res) =>{
    const store = configureStore({
        reducer:{
            estates: estatesReducer
        }
    });
    
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
        res.contentType('text/html');
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