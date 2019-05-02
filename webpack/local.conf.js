const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const portfinder = require('portfinder')
const defaultPort = 8095

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    port: defaultPort,
    hot: true,
    host: 'localhost',
    overlay: true,
    open: true,
    watchOptions: {
      poll: true,
    },
    stats: 'errors-only',
    historyApiFallback: true,
    progress: true,
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src')],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../envs/local'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new StylelintPlugin({
      files: ['src/**/*.{vue,css,scss}'],
      syntax: 'scss',
    }),
    new FriendlyErrorsPlugin(),
  ],
})

module.exports = async () => {
  portfinder.basePort = defaultPort
  await portfinder.getPort((err, port) => {
    if (err) throw err
    devWebpackConfig.devServer.port = port
  })
  return devWebpackConfig
}
