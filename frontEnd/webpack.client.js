const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

// Creates a css and js bundle for the client
module.exports = function(env, argv) {
    
    const config = {
        mode: process.env.NODE_ENV,
        
        entry: "./src/client",
        
        output: {
            filename: "clientBundle.js",
            path: path.resolve(__dirname, "./clientBuild"),
            publicPath: "/staticAssets/"
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
                                    "targets": ">0.25%, not dead, not ie 11"
                                }],
                                ["@babel/preset-react", {"runtime": "automatic"}],
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader", 
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        "postcss-preset-env",
                                        require('tailwindcss')
                                    ]
                                }
                            }
                        }
    
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|webp)$/i,
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
        
        plugins: [
            new MiniCssExtractPlugin(),
            new CssMinimizerPlugin(),
            new webpack.DefinePlugin({
                'process.env.REACT_APP_DOMAIN_NAME': JSON.stringify(process.env.REACT_APP_DOMAIN_NAME)
            }),
        ],
    };
    
    if (process.env.NODE_ENV === 'production') {
        config.devtool =  'source-map';
    }
    
    return config;
};

