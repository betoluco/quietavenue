# Quietavenue

## Introduction 
[quietavenue.com](https://quietavenue.com) is a web app for the real estate market. The frontend is a server-side rendering React app hosted in an AWS Lambda function. The backend is also hosted in a Lambda function that queries a RDS PostgreSQL database.

## Folders
- **templates**: Contains all the CloudFormation templates that create the required AWS infrastructure for the website.
- **getApiKey**: Lambda function code to retrieve the API Gateway API key and pass it to CloudFront.
- **frontEnd**: Node package for the frontend
- **backEnd**: Node package for the backend

## Frontend development
Use "start" script inside `frontEnd/package.json` to start a local server with hot reloading.

## Integration tests
Use "test" script inside `frontEnd/package.json`.

## Frontend bundles
- **mirror**: Script inside `frontEnd/package.json` used to create a webpack bundle with `NODE_ENV=development`.
- **prod**: Script inside `frontEnd/package.json` used to create a webpack bundle with `NODE_ENV=production`. (use when quietavenue.com is the domain name.)

## Backend bundles
- **dev-backend**: Script inside `backEnd/package.json` used to create a webpack bundle with `NODE_ENV=development`.
- **prod-backend**: Script inside `backEnd/package.json` used to create a webpack bundle with `NODE_ENV=production`.

## Deployment:
Before deployment, the backend and frontend bundles have to be created.
The configuration for the deployment is in the `samconfig.toml` file. There are two deployment configuration options "**default**" for a testing environment and "**production**"
The deployment for development or production requires the creation of the respective S3 buckets in the region indicated in `samconfig.toml` file
- `development-sam-source-bucket` 
- `production-sam-source-bucket`

The names of the buckets are determined by the "**s3_bucket**" deploy parameter in the `samconfig.toml` file

Make sure to create the required bucket before attempting the deployment. 

To build the project (for both frontend and backend):
```
sam build --use-container
```

For development:
```
sam deploy
```

For production:
```
sam deploy --config-env production
```
