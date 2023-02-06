# quietavenue.com
Check specific documetation

Make sure you have node v14.0.0

## Run the app locally
```bash
cd code
npm run dev
cd ..
sam build
sam local start-api -p 8080 --env-vars ./localDeployEnvVar.json
```

## To test locally with cypress 9.7.0
```bash
cd code
npx cypress run 
```

## Deploy the application for testing
```bash
cd code
npm run test
cd ..
sam build
sam deploy
```

Afther a deployment you need to invalidate the cache on cloudfront to see the change applied

# Given that sam build is really slow, you use Create React App to create a app and develop in there

1. Clone the proyect to aws cloud9 and initialize it 
```bash
    git clone https://github.com/betoluco/quietavenue_fast_dev.git
    npm init
```
2. Copy the files

    code/cypress.json                                   ==> cypress.json       
    code/tailwind.config.js                             ==> tailwind.config.js                  
    code/src/Root.js                                    ==> src/Root.js   
    code/src/Routes.js                                  ==> src/Routes.js    
    code/src/ScrollToTop.js                             ==> src/ScrollToTop.js 
    code/src/estatesReducer.js                          ==> src/estatesReducer.js 
    code/src/style.css                                  ==> src/style.css   
    code/src/trie.js                                    ==> src/trie.js 
    code/src/common/*                                   ==> src/common/*
    code/src/contact/*                                  ==> src/contact/*        
    code/src/estate/*                                   ==> src/estates/*                    
    code/src/estates/*                                  ==> src/estates/* 
    code/src/freeTrial/*                                ==> src/freeTrial/*               
    code/src/notFound/*                                 ==> src/notFound/*           

3. run the app (npm start), and see the preview -> preview running application
4. 
# Understanding the deployment process of the project

## Introduction 
This project is a single page serverless side rendering web app, developed using [Express]( https://expressjs.com) framework for Node.js for backend and [React](https://reactjs.org) JavaScript library for the front end. It is deployed in Amazon Web Services using AWS [Serverless Application Model](https://aws.amazon.com/es/serverless/sam/) (SAM)
The web app has the following work flow. When a request is made to https://quietavenue.com AWS [CloudFront]( https://aws.amazon.com/cloudfront/) content delivery network takes the request and attaches the header `x-api-key` with an API key as its value and pass it to AWS [API Gateway]( https://aws.amazon.com/api-gateway/) where the key is validated and the request is passed to a AWS [Lambda function]( https://aws.amazon.com/lambda/).
The AWS [Lambda function](https://aws.amazon.com/lambda/) is a serverless function that renders the website with the help of Express as server, making a call to https://quietavenue.com/api/estates which is the same lambda function, to scan the [DynamoDB](https://aws.amazon.com/dynamodb/)  database to get the info for the render
The response created by the function consist of the HTML and a window.\__PRELOADED_STATE\__  variable that contains the database info to preload the [Redux store](https://redux.js.org/usage/server-rendering)  to keep the displayed content is sync with it.
Once the response reached the browser, the browser calls https://quietavenue.com/assets/* and CloudFront redirect the “assets” url to the AWS [S3 Bucket]( https://aws.amazon.com/s3/) to get  css style sheets and the javaScrip to make the [Hydration of the React](https://beta.reactjs.org/reference/react-dom/hydrate) and the images

## Deployment process
Using different steps, the deployment can be done:
+ Local deployment
+ web deployment for testing (on a testing domain)
+ web deployment for production
#### Building bundles with webpac
Given that the web app is a React server side rendering [webpack](https://webpack.js.org/) has to build two bundles one for the server an and one for the client
The files webpack.client.js and webpack.server.js have the configuration for creating the bundles for client and server respectably. 
In order to create the bundles for the different deployments the following package.json scripts have to be run
```bash
npm run dev # for local deployment
npm run test # for web deployment for testing 
npm run prod # for web deployment for production
```
For all these scripts a `NODE_ENV` is set, development for `dev` script and production for `test` and `run` scripts
Also `REACT_APP_DOMAIN` user environment variable is set to the domain from where static assets are going to be retrieved. For the `dev` and `test` the domain of the web deployment for testing, and for `prod` the domain of the web deployment for production
And `CORS` user environment variable which set the CORS configuration for the Express server. For the `dev` and `test` (*) all domains and for `prod` the domain of the web deployment for production
The `test` script also uploads static assets to the bucket deleting old one before
For `prod` assets have to be uploaded manually and the maps (css and js) created by the production environment also have to be manually uploaded to `s3://quietavenuerawfiles/quietavenue/mapfiles/`

#### Sam build
After transpiling the code AWS [SAM](https://aws.amazon.com/serverless/sam/) (Sereverless application Model) has to build the code
```bash
sam build
```
#### Deploying 
The deployment for local, consist on running the app on port 8080 and passing the name of the DynamoDB table and S3 Bucket to be used for that deployment as –env-vars. Those variables are in the localDeployEnvVar.json file
```bash
sam local start-api -p 8080 --env-vars ./localDeployEnvVar.json
```
The web deployment for testing configuration can be found on the `samconfig.toml` file in the default [toml table](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html) 
```bash
sam deploy
```
The web deployment for production configuration can be found in the `samconfig.toml` file in the default [toml table](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html) 

```bash
sam deploy  --config-env TEXT
```

