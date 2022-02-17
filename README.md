# quietavenue.com

The website is deployed on Amazon Web Services (AWS) and uses the following services.

- S3: quietavenue S3 bucket is used to store resources like: images, audios, json files, and webpack bundles
- DynamoDB: quietavenue DynamoDB table stores data of the properties and links to resources like images, stored on S3
- Elasticsearch Service: quietavenue domain is used for suggesters when looking for a property or a city
- Lambda: quietavenue lambda function executes the server side code
- API Gateway: as trigger for quietavenue lambda function
- Cloud9: quietavenue Cloud9 as development environment


## quietavenue Cloud9
The project consist of a serverless side rendering React app with hydration and a REST API. The  server side rendering and the API are run in a lambda function that is created
by SAM using a template (quietavenue/template.yaml). The function is triggered by an API Gateway event. The event, passed to the function is handled by Express.js (framework)


## Deploy the application
The deployment process has the following steps:

The source code (quietavenue/code/src) is transpiled and bundled with the help of webpack, to build a bundle for client side hydration. The configuration for webpack can be found on src/webpack.client.js 


To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modified IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your API Gateway Endpoint URL in the output values displayed after deployment.

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
quietavenueSSR$ sam build
```

The SAM CLI installs dependencies defined in `hello-world/package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
quietavenueSSR$ sam local invoke HelloWorldFunction --event events/event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
quietavenueSSR$ sam local start-api
quietavenueSSR$ curl http://localhost:3000/
```

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```


## Testing api
Make sure that the machine is on is on the same VPC as the ElasticSearch that is going to query 
and has the correct security group. Also has the policy to query the Dynamo DB

cd quietavenueSSR/code
npm run build
cd ..
sam build
sam local start-api -p 8080


## Production stage
for production
Comment "devtool: "#eval-source-map"," in quietavenueSSR/code/webpack.client.js
change "mode" in quietavenueSSR/code/webpack from "development" to "production"
change the store creation method.
change the cors configuration in app

