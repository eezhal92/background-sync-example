const webpack = require('webpack');
const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: ['regenerator-runtime/runtime', './src/index.js'],
    detail: ['regenerator-runtime/runtime', './src/detail.js'],
    sw: ['regenerator-runtime/runtime', './src/sw.js'],
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CleanWebpackPlugin(['public/dist']),
  ],
};
