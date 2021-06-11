const path = require("path");
const nodeExternals = require("webpack-node-externals");

// Client side bundle for hydration
module.exports = function(env, argv) {
    
    return {
        mode: process.env.NODE_ENV ? 'production' : 'development',
        
        entry: "./src/lambda.js",
        
        output: {
            filename: "serverBundle.js",
            path: path.resolve(__dirname, "./"),
            libraryTarget: "commonjs2",
            assetModuleFilename: 'dist/[hash][ext][query]',
            publicPath: "https://s3-us-west-1.amazonaws.com/quietavenue.com/dist/"
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
        
        target: "node",
        
        externals: [nodeExternals()],
    };
};

