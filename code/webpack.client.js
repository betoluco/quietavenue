const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Dotenv = require('dotenv-webpack');

// Client side bundle for hydration
module.exports = function(env, argv) {
    
    const config = {
        mode: process.env.NODE_ENV,
        
        entry: "./src/client",
        
        output: {
            filename: "clientBundle.js",
            path: path.resolve(__dirname, "clientBuild"),
            publicPath: "https://quietavenue.com/assets/dist/"
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
                    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
                },
                {
                    test: /\.(png|svg|jpg|jpeg)$/i,
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
            new Dotenv({path: `./.env.${process.env.DOTENV}`})
        ],
    };
    
    if (process.env.NODE_ENV === 'production') {
        config.devtool =  'source-map';
    }
    
    return config
};

