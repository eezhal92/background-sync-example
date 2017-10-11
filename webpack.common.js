const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  entry: {
    index: ['regenerator-runtime/runtime', './src/index.js'],
    detail: ['regenerator-runtime/runtime', './src/detail.js'],
    sw: ['regenerator-runtime/runtime', './src/sw.js'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: resolve(__dirname, 'src'),
      },
    ],
  },
  resolve: {
    alias: {
      app: resolve(__dirname, 'src'),
    },
  },
};
