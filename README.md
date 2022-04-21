# quietavenue.com

The project consist of a serverless side rendering React app with hydration and a HTTP API. The  server side rendering and the API are run in a lambda function. 
The function is triggered by an API Gateway event. The server side rendering is handled by Express.js

The website is deployed on Amazon Web Services (AWS) and uses the following services.

- S3: quietavenue.com S3 bucket is used to store assets (images, audios, json, and the hydration bundle)
- DynamoDB: quietavenue.com DynamoDB table stores data of the estates and links to assets, like images stored on S3
- Elasticsearch Service: (not working 2022) domain is used for suggesters when searching
- Lambda: quietavenue lambda function executes the server side code and API code
- API Gateway: as trigger for quietavenue lambda function
- CloudFront: for certificates and redirecting to S3 static assets
- Cloud9: quietavenue Cloud9 as development environment

## Build and test locally
```bash
cd code
npm run dev
cd ..
sam build
sam local start-api -p 8080
```

On menu bar go to Preview > Preview Running Application
After you are done, don't forget to delete clientBuild folder, dist folder and serverBundle File

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
After you are done, don't forget to delete clientBuild folder, dist folder and serverBundle File