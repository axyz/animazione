const path = require('path');

const config = {
  entry: './src/animazione.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'animazione.js',
    library: 'Animazione',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};

module.exports = config;
