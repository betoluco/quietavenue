# Basic process

## Introduction 
[quietavenue.com](https://quietavenue.com) is a web app for the real estate market. It helps its users (prospective house buyers) to get an idea of what will be like to live in the house they are interested in, by showing them audio graphics and video of the surroundings of the property
The web app is a single page application developed using React and Redux, and also relaying on D3.js for audio graphs and vimeo.com website for storing and streaming video
It is hosted on Amazon Web Services (AWS) using the AWS Lambda serverless functions for the API and server side rendering the app. AWS DynamoDB as is database and AWS S3 buckets for storing assets. Also AWS CloudFront content delivery network is used for security purposes

## Work flow 
When a request is made to [quietavenue.com](https://quietavenue.com), AWS CloudFront content delivery network receives the request and inserts to it the header `x-api-key` containing a API key needed to access API Gateway. After API GateWay validates the key the request is passed to the AWS Lambda function
The AWS Lmbda serverless function renders the website with the help of [Express]( https://expressjs.com) framework for Node.js. The data necessary for the render is obtained by making a call to the API https://quietavenue.com/api/estates (a recursive call). The call to the API scans the DynamoDB database to get the info for the render
The response created by the Lambda function consist of the HTML to render the website and a window.\__PRELOADED_STATE\__  variable that contains the database info to preload the [Redux store](https://redux.js.org/usage/server-rendering)  to keep the displayed content is sync with the store.
Once the response reached the browser, the browser calls https://quietavenue.com/assets/* and CloudFront redirect the “assets” url to the AWS S3 Bucket to get  css style sheets, images and the javaScrip to make the [Hydration of the React](https://beta.reactjs.org/reference/react-dom/hydrate)

## Deployment in mirror site
Given that the site is deployed on AWS a mirror website [https://d14gjrmy4gfvfp.cloudfront.net/](https://d14gjrmy4gfvfp.cloudfront.net/) is implemented for testing the infrastructure as well as changes without affecting the production website. For deployment in the testing site, you have to do the following steps 
```bash
cd code
npm run mirror
cd ..
sam build
sam deploy
```
Package.json `test` script uploads all the assets required for the website (js, css, images) to the S3 bucket of the test deployment

## Deployment in production
For deployment in production site
```bash
cd code
npm run prod
cd ..
sam build
sam deploy  --config-env production
```
The assets have to be manually uploaded. This way you have the previous assets and the new ones in case there is a problem with the deployment you can return to the previous version of Lambda function

## Development
The development is done in cloud9 development environment and the local editing can be done in two ways
+ Using AWS serverless application model (SAM) `sam local start-api`
+ Using Create React App front end build pipeline `npm start`
SAM allow to test the frontend and the backend but you have to manually create the webpack bundles, build with SAM and create and start the api, so there is not hot reloading
```bash
cd code
npm run dev
cd ..
sam build
sam local start-api -p 8080 --env-vars ./localDeployEnvVar.json
```
To use the Create React App front end build pipeline (This allows hot reloading)
```bash
cd code
npm start
```
In both developing scenarios, the data for rendering is gathered from the mirro website API
## Testing
To test with cypress inside cloud 9 you have to do it headless, and have to run the website locally in one of the two methods shown above
```bash
cd code
npx cypress run 
```
To test in the testing site, you just have to change the base url configuration in cypress.json to the test website url. But  the recommended way is that you download all the test in integration folder and run cypress in your computer, so you can see the test ran


