const path = require('path')
const { options } = require('./routes')

module.exports = {
    mode: 'development',
    entry: "./frontend/src/index.js",
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\css$/,
                use: [
                    
                   {
                    loader: "babel-loader",
                    options: {
                        presets:['@babel/env']
                    }
                   }
                ]
            }
        ]
    },
    devtool: 'source-map'
}
