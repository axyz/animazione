const path = require('path');

const config = {
  entry: './index.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "dist/",
    filename: 'animazione.js',
    library: 'Animazione',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  devServer: {
    contentBase: "./example/",
  },
};

module.exports = config;
