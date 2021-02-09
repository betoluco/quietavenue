import React, { Fragment } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import serializer from "serialize-javascript";
import { Provider } from "react-redux";

import routes from "./routes";

const renderer = (req, store, context) => {
    const content = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={ context }>
                <Fragment>{renderRoutes(routes)}</Fragment>
            </StaticRouter>
        </Provider>
    );
    
    return `
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://s3-us-west-1.amazonaws.com/quietavenue.com/style.css">  
                <script>
                    window.__PRELOADED_STATE__ = ${serializer(store.getState())}
                </script>
            </head>
            <body>
                <div id="root">${content}</div>
                <script src="https://s3-us-west-1.amazonaws.com/quietavenue.com/bundle.js"></script>
            </body>
        </html>
    `;
};

export default renderer;