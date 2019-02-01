const path = require('path');
var nodeExternals = require('webpack-node-externals');
const buildDirectory = 'dist/server';

module.exports = {
  mode: 'production',
  entry: [
    './src/server/index.js'
  ],
  output: {
    path: path.join(__dirname, buildDirectory),
    filename: 'bundle.js',
    publicPath: '/server'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ["@babel/plugin-transform-runtime"]
        }
      },
    }],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
    target: 'node',
    externals: [nodeExternals()],
  plugins: [],
};