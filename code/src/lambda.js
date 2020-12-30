'use strict';
import awsServerlessExpress from 'aws-serverless-express';
import app from './app';

const server = awsServerlessExpress.createServer(app);

export const handler = (event, context) => {
    //Path is encoded in order to pass to express.js whitout errors
    event.path = encodeURI(event.path);
    awsServerlessExpress.proxy(server, event, context);
};