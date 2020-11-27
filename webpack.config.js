'use strict'
const pkg = require('./package.json');
const libraryName = pkg.name;
const outputFile = libraryName + '.min.js';
const path = require("path")

module.exports = {
    mode: 'production',
    entry:{
        bundle : __dirname + '/main.js' 
    },
    output:{
        path: __dirname + '/dist',
        filename: outputFile, // '[name].js'
        libraryTarget: 'umd',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [[
                        "@babel/preset-env",
                        // {
                        //     useBuiltIns: "usage"
                        // }
                    ]],
                    plugins: [
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            }
        ]
    }
}