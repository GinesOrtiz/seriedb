const appConfig = ($compileProvider, $urlRouterProvider, $mdThemingProvider,
                   NotificationProvider, cfpLoadingBarProvider) => {
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

  NotificationProvider.setOptions({
    delay: 3000,
    startTop: 0,
    startRight: 0,
    verticalSpacing: 0,
    horizontalSpacing: 0,
    positionX: 'left',
    positionY: 'top',
    templateUrl: '/notification.html'
  });

};

export default angular
  .module('app.config', [])
  .config(appConfig);
