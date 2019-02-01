const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputDirectory = 'dist';
module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: "bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            use: [{ loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            }, 'css-loader'],
          }
       ]
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new HtmlWebpackPlugin({
          template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        })
    ]
};