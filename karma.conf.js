module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    frameworks: [
      'jasmine',
    ],


    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      {
        pattern: 'spec.bundle.js',
        watched: true
      }
    ],

    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec.bundle.js': [
        'webpack',
        'sourcemap'
      ]
    },

    webpack: [
      {
        devtool: 'inline-source-map',
        module: {
          loaders: [
            {
              test: /\.js$/,
              loader: 'babel',
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
              loader: 'style!css'
            },
            {
              test: /\.scss$/,
              loader: 'style!css!sass'
            }
          ]
        },
      },
    ],

    // list of files to exclude
    exclude: [],
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    singleRun: false

  });
};
