const appConfig = ($compileProvider, $urlRouterProvider, $mdThemingProvider,
                   cfpLoadingBarProvider) => {
  'use strict';
  cfpLoadingBarProvider.includeSpinner = false;
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|skype|tel):/);

  $mdThemingProvider.definePalette('BMPallete', $mdThemingProvider.extendPalette('grey', {
    '400': '#4583d4',
    'contrastDefaultColor': 'light'
  }));

  $mdThemingProvider.theme('default')
    .primaryPalette('BMPallete', {
      'default': '400'
    });

  $urlRouterProvider.otherwise(function () {
    window.location.href = '/';
  });

};

export default angular
  .module('app.config', [])
  .config(appConfig);
