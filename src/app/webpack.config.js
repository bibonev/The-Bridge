var path = require("path")
var webpack = require('webpack')

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    organisation_search: './reactjs/modules/OrganisationSearch/index',
    posts_dashboard: './reactjs/modules/PostsDashboard/index',
    // posts_organisation: './reactjs/modules/PostsOrganisation/index',
    // review_organisation: './reactjs/modules/ReviewOrganisation/index',
    organisation_view: './reactjs/modules/OrganisationView/root',
    studio_organisation: './reactjs/modules/StudioOrganisation/index',
    requests_user: './reactjs/modules/RequestsUser/index',
    navbar: './reactjs/modules/Navbar/index',
    vendors: ['react']
  },

  output: {
      path: path.resolve('./static/bundles/local/'),
      filename: "[name]-[hash].js"
  },

  externals: [], // add all vendor libs

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
  ], // add all common plugins here

  module: {
    loaders: [] // add all common loaders here
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}