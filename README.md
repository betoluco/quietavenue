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