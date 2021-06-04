const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require("webpack-node-externals");

// Client side bundle for hydration
module.exports = function(env, argv) {
    const publicPath = "https://s3-us-west-1.amazonaws.com/quietavenue.com/"
    const assetModuleFilename ='images/[hash][ext][query]'
    
    return [
        {
            mode: env.production ? 'production' : 'development',
            
            entry: "./src/client",
            
            output: {
                filename: "clientBundle.js",
                path: path.resolve(__dirname, "clientBuild"),
                assetModuleFilename: assetModuleFilename,
                publicPath: publicPath
            },
            
            module: {
                rules: [
                    {
                        test: /.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    ["@babel/preset-env", {
                                        "corejs" :3.8,
                                        "useBuiltIns": "usage",
                                        "targets": ">0.25%, not dead, not ie 11"
                                    }],
                                    "@babel/preset-react",
                                ]
                            }
                        }
                    },
                    {
                        test: /\.css$/i,
                        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                    },
                    {
                        test: /\.(png|svg|jpg|jpeg|gif)$/i,
                        type: 'asset/resource',
                    },
                ]
            },
            
            resolve: {
                extensions: [".js", ".jsx", ".json"],
                fallback: {
                    "path": false,
                } 
            },
            
            devtool: env.production ? 'source-map' : 'eval',
            
            plugins: [new MiniCssExtractPlugin()],
        },
        
        {
            mode: env.production ? 'production' : 'development',
            
            entry: "./src/lambda.js",
            
            output: {
                filename: "serverBundle.js",
                path: path.resolve(__dirname, "./"),
                libraryTarget: "commonjs2",
                assetModuleFilename: assetModuleFilename,
                publicPath: publicPath
            },
            
            module: {
                rules: [
                    {
                        test: /\.js?$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    ["@babel/preset-env", {
                                        "corejs" :3.8,
                                        "useBuiltIns": "usage",
                                        "targets":{
                                            "node":"12"
                                        }
                                    }],
                                    "@babel/preset-react",
                                ]
                            }
                        }
                    },
                    {
                        test: /\.(png|svg|jpg|jpeg|gif)$/i,
                        type: 'asset/resource',
                    },
                ]
            },
            
            resolve: {
                extensions: [".js", ".jsx", ".json"],
            },
            
            target: "node",
            
            externals: [nodeExternals()],
        }
    ];
};

