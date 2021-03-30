const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const currDir = process.cwd();

module.exports = {
  entry: path.resolve(currDir, 'src', 'index.js'),
  output: {
    path: path.resolve(currDir, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(currDir, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(currDir, 'src', 'index.html'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        }
      },
    ]
  }
}