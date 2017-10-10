const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.static(__dirname + '/public'));

if (!isProd) {
  const webpack = require('webpack');
  const webDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('./webpack.dev');
  const compiler = webpack(webpackConfig);

  app.use(webDevMiddleware(compiler));
}

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
