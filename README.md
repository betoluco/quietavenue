# quietavenue.com

The project consists of a serverless side rendering React app with hydration and a HTTP API. The server side rendering and the API are run in a lambda function. 
The function is triggered by an API Gateway event. The server side rendering is handled by Express.js

The website is deployed on Amazon Web Services (AWS) and uses the following services.

- S3: quietavenue.com S3 bucket is used to store assets (images, audios, json, and the hydration bundle)
- DynamoDB: quietavenue.com DynamoDB table stores data of the estates and links to assets, like images stored on S3
- Elasticsearch Service: (not working 2022) domain is used for suggesters when searching
- Lambda: quietavenue lambda function executes the server side code and API code
- API Gateway: as trigger for quietavenue lambda function
- CloudFront: for certificates and redirecting to S3 static assets
- Cloud9: quietavenue Cloud9 as development environment

# After you are done, don't forget to delete clientBuild folder, dist folder and serverBundle File

## Run the app locally
```bash
cd code
npm run dev
cd ..
sam build
sam local start-api -p 8080
```

On menu bar go to Preview > Preview Running Application

## To test locally 
```bash
cd code
npx cypress run --headless
```

## Deploy the application
```bash
cd code
npm run prod
cd ..
sam build
cd code
npm run prod-upload-assets
cd ..
sam deploy
```

You need to delete the cache on cloudfront

## After every deployment is recommended that quietavenue.com is tested with cypress tests. To do this you need to have node installed in your local machine.

1. Create a new folder
2. In terminal go to the folder and create a node package, use default configuration 
```bash
npm init
```
3 Install cypress and open it
 ```bash
npm install cypress
npx cypress open
```
4. Open folder and delete the test (folders and files) inside cypress/integration folder
5. Download the test (folders and files) of the project located in code/cypress/integration and paste it in cypress/integration folder on your local machine
6. Edit the test in to point to quietavenue.com