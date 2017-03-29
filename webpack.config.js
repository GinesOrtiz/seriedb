var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var modRewrite = require('connect-modrewrite');
var VersionFile = require('webpack-version-file-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
  __API_URL__: JSON.stringify(process.env.API_URL || 'http://api.billydomain.com'),
  __VERSION__: JSON.stringify(require('./package.json').version),
  __SENTRY_ID__: JSON.stringify(process.env.SENTRY_ID),
  __INTERCOM_ID__: JSON.stringify(process.env.INTERCOM_ID),
  __MIXPANEL_ID__: JSON.stringify(process.env.MIXPANEL),
  __GA_ID__: JSON.stringify(process.env.GA)
});

var config = [
  {
    context: pathConfig.context,
    devtool: 'source-map',
    entry: {
      bundle: './index.js',
      appShell: './appShell/index.js'
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
      new BrowserSyncPlugin(
        // BrowserSync options
        {
          reload: false,
          ghostMode: false,
          notify: false,
          codeSync: false,
          ui: false,
          // browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3000,
          // proxy the Webpack Dev Server endpoint
          // (which should be serving on http://localhost:3100/)
          // through BrowserSync
          proxy: 'http://localhost:8080/',
          middleware: [
            modRewrite([
              '!\\.\\w+$ /index.html [L]'
            ])
          ]

        },
        // plugin options
        {
          // prevent BrowserSync from reloading the page
          // and let Webpack Dev Server take care of this

        }
      )
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
      // any option http://www.jshint.com/docs/options/
      // i. e.
      camelcase: true,

      // errors are displayed by default as warnings
      // set emitErrors to true to display them as errors
      emitErrors: false,

      // to not interrupt the compilation
      // if you want any file with jshint errors to fail
      // set failOnHint to true
      failOnHint: false
    }
  },
  {
    context: pathConfig.context,
    devtool: 'source-map',
    entry: {
      worker: './worker.js'
    },
    output: {
      publicPath: '/',
      path: pathConfig.context,
      filename: '[name].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        __CACHE_VERSION__: JSON.stringify(Math.floor(Math.random() * 10000000)
          .toString()),
        __API_URL__: JSON.stringify(process.env.API_URL || 'http://api.billydomain.com'),
        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
      })
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: [
            /dist/,
            /node_modules/,
          ],
        },
      ]
    },
  }
];

if (process.env.NODE_ENV === 'production') {
  //project config
  config[0].module.loaders[0] = {
    test: /\.js$/,
    loader: 'ng-annotate!babel',
    exclude: /node_modules/
  };
  config[0].output.path = pathConfig.distPath;
  config[0].plugins = [
    new CopyWebpackPlugin([
      {
        from: pathConfig.context + '/manifest.json',
        to: pathConfig.distPath
      }
    ]),
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

  //workers config
  config[1].output.path = pathConfig.distPath;
  config[1].plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    })
  );
}

module.exports = config;
