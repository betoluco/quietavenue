const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

// Client side bundle for hydration
module.exports = function(env, argv) {
    
    return {
        mode: process.env.NODE_ENV,
        
        entry: "./src/lambda.js",
        
        output: {
            filename: "serverBundle/serverBundle.js",
            path: path.resolve(__dirname, "./"),
            libraryTarget: "commonjs2",
            assetModuleFilename: 'dist/[hash][ext][query]',
            publicPath: `${process.env.REACT_APP_DOMAIN}/assets/`
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
                                    "corejs" :3.8,
                                    "useBuiltIns": "usage",
                                    "targets":{
                                        "node":"14"
                                    }
                                }],
                                "@babel/preset-react",
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
                'process.env.REACT_APP_DOMAIN': JSON.stringify(process.env.REACT_APP_DOMAIN),
                'process.env.CORS': JSON.stringify(process.env.CORS),
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

