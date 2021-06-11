const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Client side bundle for hydration
module.exports = function(env, argv) {
    
    return {
        mode: process.env.NODE_ENV ? 'production' : 'development',
        
        entry: "./src/client",
        
        output: {
            filename: "clientBundle.js",
            path: path.resolve(__dirname, "clientBuild"),
            publicPath: "https://s3-us-west-1.amazonaws.com/quietavenue.com/dist/"
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
        
        devtool: process.env.NODE_ENV ? 'source-map' : 'eval',
        
        plugins: [new MiniCssExtractPlugin()],
    };
};

