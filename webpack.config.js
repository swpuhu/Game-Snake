const path = require('path');
const HtmlWebpakcPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devtool: 'inline-sourcemap',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000
    },
    plugins: [
        new HtmlWebpakcPlugin({template: './src/index.html'})
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }
        ]
    }
}