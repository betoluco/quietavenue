const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

// Client side bundle for hydration
module.exports = function(env, argv) {
    
    return {
        mode: process.env.NODE_ENV,
        
        entry: "./src/lambda.js",
        
        output: {
            filename: "backEndBundle/backEndBundle.js",
            path: path.resolve(__dirname, "../"), //absolute path of the directory
            libraryTarget: "commonjs2" //The return value of your entry point will be assigned to the module.exports
        },
        
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: [/node_modules/],
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", {
                                    "targets":{
                                        "node":"18"
                                    }
                                }],
                            ]
                        }
                    }
                },
                {
                    test: /\.pem/,
                    type: 'asset/source',
                },
            ]
        },
        
        optimization: {
            minimizer: [new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                }
            })],
        },
        
        plugins: [
            new webpack.DefinePlugin({
                'process.env.REGION': JSON.stringify(process.env.REGION)
            }),
        ],
        
        target: "node",
    };
};

