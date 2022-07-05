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

3. run the app (npm start), ans see the preview -> preview running application