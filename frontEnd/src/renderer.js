import React, { createElement }  from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import serializer from "serialize-javascript";
import { Provider } from "react-redux";

import routes from "./routes";
import rehydrationBundle from "../clientBuild/clientBundle.js";
import css from "../clientBuild/main.css";

const createElementsFromRoutes = (routes) =>{
    return routes.map( (route, i) =>{
        const attributes = {
            element: route.element,
            key: route.element.type.name
        };
        if (route.path) attributes.path = route.path;
        
        if (route.children) {
            const routeChildren = createElementsFromRoutes(route.children);
            return createElement(Route, attributes, ...routeChildren);
        }
        
        return createElement(Route, attributes);
    });
};


const renderer = (req, store, context) => {
    const content = ReactDOMServer.renderToString(
        <Provider store={store}>
            <React.StrictMode>
                <StaticRouter location={req.path}>
                    <Routes>
                        {createElementsFromRoutes(routes)}
                    </Routes>
                </StaticRouter>
            </React.StrictMode>
        </Provider>
    );
    
    return `
        <html>
            <head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-X36JD5Z2M5"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    window.gtag = gtag
                    gtag('js', new Date());
                    
                    gtag('config', 'G-439GZCCJLJ');
                </script>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="${css}">  
                <script>
                    window.__PRELOADED_STATE__ = ${serializer(store.getState())}
                </script>
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="${rehydrationBundle}"></script>
            </body>
        </html>
    `;
};

export default renderer;