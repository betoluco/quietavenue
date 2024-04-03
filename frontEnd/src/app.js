import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import express from "express";
import { configureStore } from '@reduxjs/toolkit';
import { matchPath } from "react-router";

import renderer from "./renderer";
import routes from "./routes";
import estatesReducer from './estatesReducer';
import playerReducer from './playerReducer';

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());

app.get("*", async (req, res) =>{
    const store = configureStore({
        reducer:{
            estates: estatesReducer,
            player: playerReducer
        }
    });
    
    //const path = req.apiGateway.event.path;
    const path = "/"
    
    const getMatchRoute = (path, routes) => {
        for (let i = 0; i < routes.length; i++){
            let matchRoute = undefined;
            if (routes[i].children) {
                matchRoute = getMatchRoute(path, routes[i].children);
            }
            if (matchRoute)  return matchRoute;
        };
        
        return routes.find( (route) =>{
            // matchPath trows error if the route has no path
            if (route.path) return matchPath(route, path);
            return false;
        });
        
    };
    
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
        const route = getMatchRoute(path, routes);
        if (route.loadData){
            await route.loadData(store, req);
        }
        render();
    }catch(err){
        console.error("app error", err);
        render();
    }
});

export default app;