var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.config.js')

config.devtool = "#eval-source-map"

config.entry = {
  main: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './reactjs/main',
  ],
}

config.output.publicPath = 'http://localhost:3000' + '/assets/bundles/'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats.json'}),
])

config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] }
)

module.exports = config