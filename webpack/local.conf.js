'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    port: 8095,
    hot: true,
    host: 'localhost',
    overlay: true,
    open: true,
    stats: 'errors-only',
    historyApiFallback: true,
    progress: true
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../envs/local')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
