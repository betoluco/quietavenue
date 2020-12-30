const path = require("path");

module.exports = {

    // Tell webpack the root file of our
    // server application
    entry: "./src/client",
    
    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "client_build")
    },
    
    //Change to production or development
    mode:"development",
    
    //For development purpose only
    devtool: "#eval-source-map",
    
    // Tell webpack to run babel on every file it runs through
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-react",
                        ["@babel/preset-env", { 
                            "corejs":3.8, 
                            "useBuiltIns": "usage",
                            "debug":true,
                            "targets": ">0.25%, not dead, not ie 11"
                        }]
                    ]
                }
            }
        ]
    }
};