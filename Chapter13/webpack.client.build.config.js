const path = require('path');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const buildDirectory = 'dist';
const outputDirectory = buildDirectory + '/client';

module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: "bundle.js",
      publicPath: '/',
      chunkFilename: '[name].[chunkhash].js'
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
      new CleanWebpackPlugin([buildDirectory]),
      new ReactLoadablePlugin({
        filename: './dist/react-loadable.json',
      }),
      new MiniCssExtractPlugin({
          filename: 'bundle.css',
      })
    ]
};