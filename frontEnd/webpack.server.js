const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

// Client side bundle for hydration
module.exports = function(env, argv) {
    
    return {
        mode: process.env.NODE_ENV,
        
        entry: "./src/lambda.js",
        
        output: {
            filename: "serverBundle.js",
            path: path.resolve(__dirname, "../frontEndBundle"),
            libraryTarget: "commonjs2",
            assetModuleFilename: "staticAssets/[hash][ext][query]",
            publicPath: "/" //Make path relative to root
        },
        
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: [/node_modules/, /clientBuild/],
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", {
                                    "targets":{
                                        "node":"18"
                                    }
                                }],
                                ["@babel/preset-react", {"runtime": "automatic"}]
                            ]
                        }
                    }
                },
                {
                    test: /(clientBundle\.js)|\.(ico|png|svg|jpg|jpeg|css|webp)$/i,
                    type: 'asset/resource',
                },
            ]
        },
        
        resolve: {
            extensions: [".js", ".jsx", ".json"],
        },
        
         plugins: [
            new webpack.DefinePlugin({
                'process.env.REACT_APP_DOMAIN_NAME': JSON.stringify(process.env.REACT_APP_DOMAIN_NAME),
            }),
        ],
        
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
        
        target: "node",
    };
};

