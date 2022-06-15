# quietavenue.com

The project consists of a serverless side rendering React app with hydration and a HTTP API. The server side rendering and the API are run in a lambda function. 
The function is triggered by an API Gateway event. The server side rendering is handled by Express.js

## To set up the project in a aws cloud9 environment
1. Create a Cloud9 environment
    i. Use the cheapest instance type
    ii. In Network Settings select quietavenue|vpc-063a7278724443b38 as Network(VPC) and 10.0.1.0_US_WEST_1_quietavenue_PUB as the subnet

2. In AWS EC2 console add the security groups to cloud9
    i. Select the Cloud9 instance
    ii. Go to Actions => Security => Change security groups
    iii. Select the default security group for quietavenue sg-052d6d59f5c84778c
    iv. click on "Add security group" and check that appears on the list "Security groups associated with the network interface" and save
    v.Check in security tab that the correct security group is applied

3. In AWS AIM console create a new role 
   i. Select your use case: EC2
   ii. Attach permissions policies: AdministratorAccess

4. In AWS EC2 console attach the role to the Cloud9 instance
   i. Selece the Cloud9 instance
   ii. Go to Actions -> Security -> Modify IAM Role
   iii. In the drop down list select the role previously created
More info on [aws docs](https://docs.aws.amazon.com/cloud9/latest/user-guide/credentials.html#credentials-temporary-attach-console) and [youtube viedo](https://www.youtube.com/watch?v=C4AyfV3Z3xs)

5. Click on AWS Cloud9 in menu bar -> Preferences -> AWS Settings -> turn off "AWS manage temporary credentials"

6. In the cloud9 bash
```bash
aws configure list
```
something like the following text must appear
```bash

      Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key     ****************2I37         iam-role    
secret_key     ****************ME6A         iam-role    
    region                <not set>             None    None
```
More info on [aws docs](https://aws.amazon.com/premiumsupport/knowledge-center/access-key-does-not-exist)

7. Clone the proyect to aws cloud9 and initialize it
```bash
git clone https://github.com/betoluco/quietavenue.git
npm init
```
Note: feel free to update the dependencies with exeption of d3-array@2.12.1


# After you are done runing the app locally or deploying it, don't forget to delete clientBuild folder, dist folder and serverBundle File

## Run the app locally
```bash
cd code
npm run dev
cd ..
sam build
sam local start-api -p 8080 --env-vars ./localDeployEnvVar.json
```

On menu bar go to Preview > Preview Running Application

## To test locally with cypress
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


# Given that sam build is really slow, you use Create React App to create a app and develop in there

1. Clone the proyect to aws cloud9 and initialize it 
```bash
    git clone https://github.com/betoluco/quietavenue_fast_dev.git
    npm init
```
2. Copy the files

    code/cypress.json                                    ==> cypress.json                               
    code/cypress/integration/logo.js                     ==> cypress/integration/logo.js                                    
    code/cypress/integration/menu.js                     ==> cypress/integration/menu.js                   
    code/src/Root.js                                     ==> src/Root.js   
    code/src/Routes.js                                   ==> src/Routes.js    
    code/src/ScrollToTop.js                              ==> src/ScrollToTop.js         
    code/src/common/BackArrow.js                         ==> src/common/BackArrow.js               
    code/src/common/HamburgerMenu.js                     ==> src/common/HamburgerMenu.js                    
    code/src/common/InternalServerError.js               ==> src/common/InternalServerError.js                       
    code/src/common/Logo.js                              ==> src/common/Logo.js       
    code/src/common/Search.js                            ==> src/common/Search.js            
    code/src/common/Slogan.js                            ==> src/common/Slogan.js           
    code/src/common/Spinner.js                           ==> src/common/Spinner.js           
    code/src/common/images/headerImage.jpg               ==> src/common/images/headerImage.jpg                        
    code/src/common/images/magnifyingGlassOp.svg         ==> src/common/images/magnifyingGlassOp.svg                               
    code/src/common/images/pointerOp.svg                 ==> src/common/images/pointerOp.svg                       
    code/src/common/images/quietavenueLogoOp.svg         ==> src/common/images/quietavenueLogoOp.svg                               
    code/src/contact/Contact.js                          ==> src/contact/Contact.js           
    code/src/estate/Estate.js                            ==> src/estate/Estate.js             
    code/src/estate/EstateTemplate.js                    ==> src/estate/EstateTemplate.js                   
    code/src/estate/Vimeo.js                             ==> src/estate/Vimeo.js           
    code/src/estate/graph/AudioPlayer.js                 ==> src/estate/graph/AudioPlayer.js                       
    code/src/estate/graph/ColorScale.js                  ==> src/estate/graph/ColorScale.js                   
    code/src/estate/graph/Graph.js                       ==> src/estate/graph/Graph.js               
    code/src/estate/graph/minusSignOp.svg                ==> src/estate/graph/minusSignOp.svg                        
    code/src/estate/graph/pauseOp.svg                    ==> src/estate/graph/pauseOp.svg                   
    code/src/estate/graph/playNextOp.svg                 ==> src/estate/graph/playNextOp.svg                       
    code/src/estate/graph/playOp.svg                     ==> src/estate/graph/playOp.svg                    
    code/src/estate/graph/playPreviousOp.svg             ==> src/estate/graph/playPreviousOp.svg                            
    code/src/estate/graph/plusSignOp.svg                 ==> src/estate/graph/plusSignOp.svg                        
    code/src/estate/graph/speakerOp.svg                  ==> src/estate/graph/speakerOp.svg                   
    code/src/estates/Card.js                             ==> src/estates/Card.js           
    code/src/estates/Estates.js                          ==> src/estates/Estates.js           
    code/src/estates/EstatesTemplate.js                  ==> src/estates/EstatesTemplate.js                   
    code/src/estates/deleteFilter.svg                    ==> src/estates/deleteFilter.svg                   
    code/src/estatesReducer.js                           ==> src/estatesReducer.js          
    code/src/freeTrial/FreeTrial.js                      ==> src/freeTrial/FreeTrial.js               
    code/src/notFound/NotFound.js                        ==> src/notFound/NotFound.js               
    code/src/style.css                                   ==> src/style.css   
    code/src/trie.js                                     ==> src/trie.js   
    code/tailwind.config.js                              ==> tailwind.config.js
    code/.env                                            ==> .env

3. run the app (npm start), ans see the preview -> preview running application