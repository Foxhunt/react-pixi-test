/* eslint-disable import/no-commonjs */
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = (env = {}) => ({
  mode: env.production ? "production" : "development",
  devtool: env.production ? "source-map" : "eval-source-map",
  output: {
    path: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    host: "0.0.0.0",
    publicPath: "http://localhost:8080"
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "src/index.html" })
  ]
})
