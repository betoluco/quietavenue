'use strict';
import awsServerlessExpress from 'aws-serverless-express';
import app from './app';

const server = awsServerlessExpress.createServer(app);

export const backEndHandler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};