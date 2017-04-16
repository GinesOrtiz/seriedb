var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var modRewrite = require('connect-modrewrite');
var VersionFile = require('webpack-version-file-plugin');

// Path Config
var pathConfig = {
  context: path.join(__dirname, 'client'),
  distPath: path.join(__dirname, 'dist'),
  assetsPath: path.join(__dirname, 'dist/assets')
};

// varPlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var varPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __ENV__: JSON.stringify(process.env.ENV),
  __API_URL__: JSON.stringify('http://api.themoviedb.org/3'),
  __TMDB__: JSON.stringify(process.env.TMDB || '54588ad726d554d3eb0bd527c9875958'),
  __TMDB_IMG__: JSON.stringify('https://image.tmdb.org/t/p/'),
  __SOCKET__: JSON.stringify('ws://51.254.205.30:3030'),
  __VERSION__: JSON.stringify(require('./package.json').version)
});

var config = {
  context: pathConfig.context,
  devtool: 'source-map',
  entry: {
    bundle: './index.js'
  },
  output: {
    publicPath: '/',
    path: pathConfig.context,
    filename: '[name]-[hash:6].js'
  },

  plugins: [
    new ExtractTextPlugin('styles-[hash:6].css'),
    varPlugin,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg: pkg,
      inject: 'head',
      template: 'index.html'
    }),
    new BrowserSyncPlugin({
      reload: false,
      ghostMode: false,
      notify: false,
      codeSync: false,
      ui: false,
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/',
      middleware: [
        modRewrite([
          '!\\.\\w+$ /index.html [L]'
        ])
      ]

    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'ng-annotate!babel',
        exclude: [
          /dist/,
          /node_modules/
        ],
      },
      {
        test: /\.(json)$/,
        loader: 'raw',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'raw!html-minifier',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader?sourceMap', 'css?sourceMap')
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=/res/[name].[ext]?[hash]'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  'html-minifier-loader': {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    preserveLineBreaks: false
  },
  jshint: {
    camelcase: true,
    emitErrors: false,
    failOnHint: false
  }
};

if (process.env.NODE_ENV === 'production') {
  config.output.path = pathConfig.distPath;
  config.plugins = [
    varPlugin,
    new webpack.ContextReplacementPlugin(/moment[\\\/]lang$/, /^\.\/(en-gb|es)$/),
    new VersionFile({
      packageFile: path.join(__dirname, 'package.json'),
      templateString: '<%= package.version %>',
      outputFile: path.join(pathConfig.distPath, 'version.txt')
    }),
    new ExtractTextPlugin('styles-[hash:6].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg: pkg,
      template: 'index.html',
      inject: 'head',
      minify: {
        collapseInlineTagWhitespace: true,
        conservativeCollapse: true,
        removeComments: true
      }
    }),
  ];
}

module.exports = config;
