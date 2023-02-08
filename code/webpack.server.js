const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

// Client side bundle for hydration
module.exports = function(env, argv) {
    
    return {
        mode: process.env.NODE_ENV,
        
        entry: "./src/lambda.js",
        
        output: {
            filename: "server/serverBundle.js", //the bundle has to be inside of a folder so that sam build only builds that file
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
                    test: /(clientBundle\.js)|\.(ico|png|svg|jpg|jpeg|css)$/i,
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
        
        target: "node",
        
        externals: [nodeExternals()],
    };
};

