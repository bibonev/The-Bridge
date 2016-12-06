var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var config = require('./webpack.config.js')
config.devtool = "#eval-source-map"
config.entry = {
  navbar: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './reactjs/modules/Navbar/index',
  ],
  organisation_search: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './reactjs/modules/OrganisationSearch/index',
  ],
  posts_dashboard: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './reactjs/modules/PostsDashboard/index',
  ],
  organisation_view: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './reactjs/modules/OrganisationView/root',
  ],
  studio_organisation: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './reactjs/modules/StudioOrganisation/index',
  ],
  requests_user: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './reactjs/modules/RequestsUser/index',
  ],
}
config.output.publicPath = 'http://localhost:3000' + '/assets/bundles/'
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats.json'}),
])
config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] }
)
module.exports = config